<script lang="ts" setup>
import axios from 'axios'
import { ILicenses, IPlanSelector, ILicenseCache, IPlanUpsellsFull } from '@/types/general.interfaces'

const props = defineProps({
  inactiveFields: {
    type: Array as () => string[],
    default: () => []
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  completeUpsellUrl: {
    type: String,
    default: ''
  }
})

const licenseData = ref<ILicenses|null>(null)
const licenseCache = ref<ILicenseCache>({})
const subscriptionPlans = ref<IPlanUpsellsFull[]>()

const getSubscriptionPlans = async() => {
  apiError.value = null
  try {
    const { plans } = await useApiAbstraction().getPlans()
    subscriptionPlans.value = plans
  } catch (error) {
    apiError.value = error
    console.error(error)
  }
}

const setLicenseCache = (plan: ILicenses) => {
  if (!plan.active?.length) return
  licenseCache.value = plan.active.reduce((acc: any, curr) => {
    if (!acc[curr.keyId]) {
      acc[curr.keyId] = {
        websites: curr.websites.count,
        websitesNextCycle: curr.websites.next_cycle_count,
        websitesDiff: curr.websites.count - curr.websites.next_cycle_count,
        servers: curr.servers.count,
        serversNextCycle: curr.servers.next_cycle_count,
        serversDiff: curr.servers.count - curr.servers.next_cycle_count
      }}
    return acc
  }, licenseCache.value)
}

const additionalMonitorPricesCollected = ref(false)
const additionalMonitorBasePrices = ref({
  websites :{},
  servers: {}
})

const apiError = ref<unknown|null>(null)
const priceError = ref<unknown|null>(null)

const getAdditionalBasePrices = async(keyId: number | string) => {
  apiError.value = null
  priceError.value = null
  if (!keyId) return
  try {
    const { data } = await useApiAbstraction().getUnitPrices(keyId.toString())
    additionalMonitorBasePrices.value = {
      websites : {
        gross: await data?.websites.nextBillingGrossPrice,
        net: await data?.websites.nextBillingNetPrice,
        vat: await data?.websites.nextBillingVatPrice
      },
      servers : {
        gross: await data?.servers.nextBillingGrossPrice,
        net: await data?.servers.nextBillingNetPrice,
        vat: await data?.servers.nextBillingVatPrice
      }
    }
    additionalMonitorPricesCollected.value = true
  } catch (error) {
    priceError.value = error
    apiError.value = error
    console.error(error)
  }
}

const mapAdditionPriceToLicense = () => {
  if (!licenseData.value) return
  const { active } = licenseData.value
  if (!active) return

  const activeWithPrice = active.map((plan) => {
    const { keyId, websites, servers } = plan
    const { websites: websiteBasePrice, servers: serverBasePrice } = additionalMonitorBasePrices.value
    return {
      ...plan,
      websites: {
        ...websites,
        price: websiteBasePrice
      },
      servers: {
        ...servers,
        price: serverBasePrice
      }
    }
  })
  licenseData.value = {
    ...licenseData.value,
    active: activeWithPrice
  }
}

const mapStatusLicense = () => {
  if (!licenseData.value) return

  const suspended = licenseData.value.active?.filter((plan) => plan.cbItemStatusId === 'DEA')?.map((plan) => ({ ...plan, status: 'suspended' })) || []
  const updatedActive = licenseData.value.active?.filter((plan) => !suspended.some((suspendedPlan) => suspendedPlan.keyId === plan.keyId))
  const canceled = licenseData.value.canceled?.filter((plan) => plan.status === 'canceled').map((plan) => ({ ...plan, cbItemStatusId: 'DEA' })) || []
  const terminated = licenseData.value.terminated?.filter((plan) => plan.status === 'terminated').map((plan) => ({ ...plan, status: 'canceled', cbItemStatusId: 'DEA' })) || []
  const expired = licenseData.value.expired?.filter((plan) => plan.status === 'expired').map((plan) => ({ ...plan, status: 'canceled', cbItemStatusId: 'DEA' })) || []
  const mergedCancelled = [...canceled, ...expired, ...terminated]

  licenseData.value = {
    ...(updatedActive && updatedActive.length ? { active: updatedActive } : {}),
    ...(suspended.length ? { suspended } : {}),
    ...(mergedCancelled.length ? { canceled: mergedCancelled } : {})
  }
}


const licensesOrder = () => {
  const order = ['active', 'suspended', 'canceled']
  const newOrder = order.reduce((acc: any, license) => {
    if (licenseData.value && license in licenseData.value) {
      acc[license] = licenseData.value[license]
    }
    return acc
  }, {})
  licenseData.value = newOrder
}

const getLicenseData = async() => {
  apiError.value = null
  try {
    licenseData.value = await useApiAbstraction().getLicenses()
    const firstKeyId = licenseData.value?.active?.[0]?.keyId || false
    if (firstKeyId && !additionalMonitorPricesCollected.value) await getAdditionalBasePrices(firstKeyId)
    mapAdditionPriceToLicense()
    mapStatusLicense()
    licensesOrder()
    setLicenseCache(licenseData.value)
  } catch (error) {
    apiError.value = error
    console.error(error)
  }
}

const canUserBuy = ref(false)
const timeOut = ref(30)
const setBuyTimeOut = () => {
  const currentUnixTime = Math.floor(Date.now() / 1000)
  sessionStorage.setItem('buyTimeout', currentUnixTime.toString())
}
const checkAndSetBuyTimeout = () => {
  const buyTimeout = sessionStorage.getItem('buyTimeout')
  if (!buyTimeout) {
    setBuyTimeOut()
  }
}

const calculateTimeDifference = (buyTimeout: number): number => {
  const currentUnixTime = Math.floor(Date.now() / 1000)
  return currentUnixTime - buyTimeout
}

const checkUserBuyStatus = () => {
  checkAndSetBuyTimeout()
  const buyTimeout = parseInt(sessionStorage.getItem('buyTimeout') || '0')
  const timeDifference = calculateTimeDifference(buyTimeout)
  canUserBuy.value = timeDifference > timeOut.value
}

onMounted(() => {
  getLicenseData()
  getSubscriptionPlans()

  checkUserBuyStatus()
  setInterval(() => {
    checkUserBuyStatus()
  }, 1000)
})

interface IUpdateLicenseData {
  keyId: number | string
  type: 'websites' | 'servers'
  count: number
}

const screenEvents = (action: string) => {
  debugEcho('ACTION RECEIVED', action)
  const events = {
    closeStoreIframe: async () => {
      debugEcho('closeStoreIframe', action)
      getLicenseData()
    }
  }
  return events[action as keyof typeof events]?.() || (() => {})
}
window.mitt.on('tsxContentScreenEvents', ({ action }: {action:string}) => {
  screenEvents(action)
})

const updateLicenseCache = (keyId: number | string, type: 'websites' | 'servers', count: number) => {
  if (!licenseCache.value) return
  if (!licenseCache.value[keyId]) return
  if (licenseCache.value[keyId][type] < count) {
    licenseCache.value[keyId][type] = count
    licenseCache.value[keyId][`${type}NextCycle`] = count
    licenseCache.value[keyId][`${type}Diff`] = 0
  } else {
    licenseCache.value[keyId][`${type}NextCycle`] = count
    licenseCache.value[keyId][`${type}Diff`] = licenseCache.value[keyId][type] - count
  }
}

const updateLicenseData = async(e: IUpdateLicenseData) => {
  if (e && Object.keys(e).length) {
    const { keyId, type, count } = e
    updateLicenseCache(keyId, type, count)
    setBuyTimeOut()
  }
  await getLicenseData()
}

const showLicenseDetails = ref(false)

const cleverbridgeUrl = ref('')


const getCleverbridgeUrl = async () => {
  if (!props.completeUpsellUrl) return
  try {
    const { data } = await axios.get(props.completeUpsellUrl)
    if (!data?.data) throw new Error('No data found')
    cleverbridgeUrl.value = data.data.url
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getCleverbridgeUrl()
})

const emit = defineEmits(['buyANewLicense'])

const buyNewLicense = () => {
  emit('buyANewLicense')
  showLicenseDetails.value = true
}
</script>

<template>
  <div v-if="!showLicenseDetails" class="viewLicense">
    <template v-if="licenseData">
      <div v-for="([key, group]) in Object.entries(licenseData)" :key="key">
        <div v-if="group?.length">
          <h3 class="text-lg font-semibold mb-2">
            {{ t(key) }}
          </h3>
          <div
            v-for="(plan, index) in group"
            :key="index"
            class="mb-4"
          >
            <SubscriptionPlan
              class="mb-1"
              :status="key"
              :plan="plan"
              :subscription-plans="subscriptionPlans"
              :read-only="readOnly"
              :inactive-fields="inactiveFields"
              @update="updateLicenseData"
            />
            <div v-if="key == 'active'" class="mb-6">
              <MonitorAdditionPlans
                :plan="plan"
                :read-only="readOnly"
                :base-prices="additionalMonitorBasePrices"
                :license-cache="licenseCache"
                :can-user-buy="canUserBuy"
                :price-error="priceError"
                @update="updateLicenseData"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="licenseData && readOnly">
      <p v-if="Object.keys(licenseData).length === 0" class="mb-4">
        {{ t('currentlyNoLicense').split('.')[0] }}.
      </p>
    </template>
    <template v-if="licenseData && !readOnly">
      <p v-if="Object.keys(licenseData).length === 0" class="mb-4">
        {{ t('currentlyNoLicense') }}
      </p>
      <p v-else class="text-base font-semibold mb-4">
        {{ t('addNewLicenses') }}
      </p>
      <GeneralButton @click="buyNewLicense">
        {{ t('buyLicense') }}
      </GeneralButton>
    </template>
    <ApiStatus v-if="!licenseData && !readOnly && apiError">
      {{ apiError }}
    </ApiStatus>
  </div>
  <div v-else class="flex flex-col h-full">
    <h3 class="text-lg font-semibold mb-2">
      {{ t('upgradeAccount') }}
    </h3>
    <iframe
      v-if="cleverbridgeUrl"
      :src="cleverbridgeUrl"
      frameborder="0"
      class="h-[calc(100%-120px)] -mx-6 w-[calc(100%+40px)]"
    />
  </div>
</template>
