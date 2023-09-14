<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const emit = defineEmits(['update'])

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

const updateTimezone = (timezone: string) => {
  emit('update', timezone)
  window.mitt.emit('tsxUserProfile', {
    action: 'updateTimezone',
    data: timezone
  })
}
</script>

<template>
  <ProfileDetailBox
    class="profilePassword"
  >
    <div class="p-6">
      <div class="text-base font-medium mb-4">
        {{ t('timezone') }}
      </div>
      <div class="smoothGridBox">
        <Timezone
          :user-data="userData"
          @update-timezone="updateTimezone"
        />
      </div>
    </div>
  </ProfileDetailBox>
</template>
