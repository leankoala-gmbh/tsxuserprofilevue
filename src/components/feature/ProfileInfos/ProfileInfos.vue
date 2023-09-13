<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  },
  inactiveFields: {
    type: Array as () => string[],
    default: () => []
  }
})
const nameInitials = computed(() => {
  if (!props.userData?.name?.length) {
    return ''
  }
  const name = props.userData.name.split(' ')
  return name.map((n) => n[0]).join('')
})

debugEcho('ProfileInfos UserData', props.userData)
</script>

<template>
  <div
    v-if="!inactiveFields.includes('avatar') && (userData.gravatar || userData.name)"
    class="tsxUp-grid-formRow items-center mb-6"
  >
    <div>{{ t('avatar') }}</div>
    <div>
      <div
        v-if="userData.gravatar"
        class="h-40 w-40 rounded-full overflow-hidden flex items-center justify-center"
      >
        <img
          :src="userData.gravatar"
          alt="avatar"
          class="w-full"
        >
      </div>
      <div
        v-else-if="userData.name"
        class="h-40 w-40 flex items-center justify-center rounded-full customAvatar font-medium uppercase"
      >
        <div class="text-center">
          {{ nameInitials }}
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="!inactiveFields.includes('email') && userData.email?.length"
    class="tsxUp-grid-formRow items-center mb-6"
  >
    <div>{{ t('email') }}</div>
    <div class="font-medium">
      {{ userData.email }}
    </div>
  </div>
</template>
