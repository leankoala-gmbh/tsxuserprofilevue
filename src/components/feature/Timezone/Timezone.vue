<script lang="ts" setup>
import timezones from '@/data/timezones.json'
import type { IProfileUser } from '@/types/general.interfaces'
import VueMultiselect from 'vue-multiselect'

const emit = defineEmits(['updateTimezone'])

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const timeZoneObj = JSON.parse(JSON.stringify(timezones))
const timezone = ref<null|string>(null)
const timezoneSavedInfo = ref(false)

const successInfo = () => {
  timezoneSavedInfo.value = true
  setTimeout(() => {
    timezoneSavedInfo.value = false
  }, 3000)
}

const saveTimezone = () => {
  successInfo()
  emit('updateTimezone', timezone.value)
}

const initialTimezone = () => {
  if (!props.userData?.timezone?.length) {
    const browserTZ = Intl.DateTimeFormat().resolvedOptions().timeZone
    timezone.value = browserTZ
    saveTimezone()
    return
  }
  timezone.value = props.userData.timezone
}

onMounted(() => {
  initialTimezone()
})

watch(() => timezone.value, (o, n) => {
  if (timezone.value && n && n !== o) saveTimezone()
})
</script>

<template>
  <div>
    <div class="w-full relative">
      <StatusMessage
        v-if="timezoneSavedInfo"
        class="mb-4"
        aria-label="statusMessage"
      >
        {{ t('timezoneInfo') }}
      </StatusMessage>
      <VueMultiselect
        v-model="timezone"
        :options="Object.keys(timeZoneObj)"
        :searchable="true"
        :close-on-select="true"
        :allow-empty="false"
        :custom-label="(opt:string) => timeZoneObj[opt]"
        placeholder=""
        select-label=""
        deselect-label=""
        selected-label=""
      />
    </div>
  </div>
</template>
