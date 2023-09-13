import type { IProfileUser, ILicenses, IPlans, IPlansUpsells, IPlanUpsellsFull } from '@/types/general.interfaces'
import axios from 'axios'

const errorHandler = (error: unknown) => {
  if (error instanceof Error) {
    throw error
  }
  console.error(error)
}

const getBaseUrl = computed(() => {
  const overrideApiUrl: undefined | string = inject('overrideBaseApiUrl')
  return overrideApiUrl || window.location.origin
})

export function useApiAbstraction (cnameOverride: string|null = null) {
  const guardUrl = () => {
    if (!getBaseUrl.value) throw new Error('No base url set')
  }

  const getLicenses = async () : Promise<ILicenses> => {
    guardUrl()
    try {
      const { data: { data: { licenses } } } = await axios.get(`${getBaseUrl.value}/license/`, { withCredentials: true })
      return licenses.reduce((acc: any, license: any) => {
        const { status } = license
        if (!acc[status]) { acc[status] = [] }
        acc[status].push(license)
        return acc
      }, {})
    } catch (error: unknown) {
      errorHandler(error)
      return {} as ILicenses
    }
  }

  const getUnitPrices = async (keyId: string) => {
    guardUrl()
    try {
      const { data } = await axios.get(`${getBaseUrl.value}/license/modify-properties/unit-costs/${keyId}`)
      return data
    } catch (error) {
      errorHandler(error)
    }
  }

  const getPlans = async () : Promise<IPlans> => {
    guardUrl()
    const planOrder = ['pro', 'business', 'enterprise']
    try {
      const { data } = await axios.get(`${getBaseUrl.value}/license/plans`, { withCredentials: true })
      if (!data.data?.length) return {} as IPlans
      const upsellPlans = data.data.map((val: IPlanUpsellsFull) => {
        return {
          productName: val.productName,
          upsells: val.upsells.map((upsell : IPlansUpsells) => {
            return {
              id: upsell.planId,
              name: upsell.productName,
              price: {
                net: upsell.nextBillingNetPrice,
                vat: upsell.nextBillingVatPrice,
                gross: upsell.nextBillingGrossPrice,
                currency: data.currency
              } }
          })
        }
      })
      return { planOrder, plans: [...new Set([...upsellPlans])]}
    } catch (error: unknown) {
      errorHandler(error)
      return {} as IPlans
    }
  }

  const upgradePlan = async (keyId: string, planId: string) : Promise<void> => {
    guardUrl()
    const keyIdNumber = Number(keyId)
    try {
      await axios.post(`${getBaseUrl.value}/license/upgrade-plan`, {
        keyId: keyIdNumber,
        planId
      }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const downgradePlan = async (keyId: string, planId: string) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/license/downgrade-plan`, {
        keyId,
        planId
      }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const upgradeProperties = async (keyId: string, planId: string, websites: number, servers: number) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/license/upgrade-properties`, {
        keyId,
        planId,
        websites,
        servers
      }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const downgradeProperties = async (keyId: string, planId: string, websites: number, servers: number) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/license/downgrade-properties`, {
        keyId,
        planId,
        websites,
        servers
      }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const modifyPropertiesPreview = async ({ keyId, websites, servers }: {keyId: string, websites: number, servers: number}) => {
    guardUrl()
    try {

      const { data } = await axios.post(`${getBaseUrl.value}/license/modify-properties/preview`, {
        keyId,
        websites,
        servers
      }, { withCredentials: true })
      return data
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const modifyProperties = async (keyId: string, websites: number, servers: number) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/license/modify-properties`, {
        keyId,
        websites,
        servers
      }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const terminateLicense = async (keyId: string) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/license/terminate`, {
        keyId
      }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const removeAccount = async (password: string) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/user/delete`, { password }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const setProfile = async (profile: IProfileUser) : Promise<void> => {
    guardUrl()
    try {
      await axios.put(`${getBaseUrl.value}/profile`, profile, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const changePassword = async (currentPassword: string, newPassword: string) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/profile/change-password`, {
        oldPassword: currentPassword,
        password: newPassword
      }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }

  const setConsent = async(consent: boolean) : Promise<void> => {
    guardUrl()
    try {
      await axios.post(`${getBaseUrl.value}/consent/set`, { enabled: consent }, { withCredentials: true })
    } catch (error: unknown) {
      errorHandler(error)
    }
  }
  const getConsent = async() : Promise<boolean> => {
    guardUrl()
    try {
      const res = await axios.get(`${getBaseUrl.value}/consent/get`, { withCredentials: true })
      return res.data.enabled || false
    } catch (error: unknown) {
      errorHandler(error)
      return false
    }
  }

  return {
    getLicenses,
    getPlans,
    upgradePlan,
    downgradePlan,
    upgradeProperties,
    downgradeProperties,
    modifyProperties,
    modifyPropertiesPreview,
    terminateLicense,
    removeAccount,
    setProfile,
    changePassword,
    setConsent,
    getConsent,
    getUnitPrices
  }
}
