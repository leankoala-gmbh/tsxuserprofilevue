<script lang="ts" setup>
const props = defineProps({
  token: {
    type: String,
    default: ''
  }
})

const storageKey = computed(() => `__mp_opt_in_out_${props.token}`)
const savedConsent = ref(localStorage.getItem(storageKey.value) === '1')

watchEffect(() => localStorage.setItem(storageKey.value, savedConsent.value ? '1' : '0'))
</script>

<template>
  <ProfileDetailBox class="profileDnt" v-if="token?.length">
    <div class="profileDetail--hover m-2 rounded px-4 py-5 cursor-pointer smoothGridBox">
      <label class="flex gap-4">
        <div class="pt-1">
          <input
            v-model="savedConsent"
            type="checkbox"
            aria-label="input"
          >
        </div>
        <div>
          <h3 class="font-medium mb-2 text-base">{{ t('dntHeadline') }}</h3>
          <p class="text-gray-600 text-sm">{{ t('dntBody') }}</p>
        </div>
      </label>
    </div>
  </ProfileDetailBox>
</template>
