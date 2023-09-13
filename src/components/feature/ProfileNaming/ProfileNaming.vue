<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const emit = defineEmits(['update'])

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  },
  open: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(false)


watch(() => props.open, () => {
  if (props.open) isOpen.value = true
}, { immediate: true })

const formSuccess = ref(false)

const successForm = (payload: {firstName: string, familyName: string}) => {
  emit('update', payload)

  window.mitt.emit('tsxUserProfile:updateNaming', payload)

  formSuccess.value = true

  setTimeout(() => {
    formSuccess.value = false
  }, 3000)
}
</script>


<template>
  <ProfileDetailBox
    :is-open="isOpen"
    class="profileNaming"
  >
    <div v-if="!isOpen" class="flex justify-between p-6">
      <div class="flex gap-4 items-center text-sm">
        <ProfileAvatar :user-data="userData" />
        <div>
          <div class="font-medium">
            {{ userData.firstName }} {{ userData.familyName }}
          </div>
          <div class="text-gray-400">
            {{ userData.email }}
          </div>
        </div>
      </div>
      <GeneralButton variant="ghost" @click="isOpen = true">
        {{ t('edit') }}
      </GeneralButton>
    </div>
    <ProfileBoxHeader v-else @close="isOpen = false">
      {{ t('editPersonalInformation') }}
    </ProfileBoxHeader>
    <template #body>
      <StatusMessage
        v-if="formSuccess"
        class="mb-4"
      >
        {{ t('successPersonalInformation') }}
      </StatusMessage>
      <ProfileAvatar :user-data="userData" class="mb-6" />
      <NamingFormular
        :user-data="userData"
        @update="successForm"
      />
    </template>
  </ProfileDetailBox>
</template>
