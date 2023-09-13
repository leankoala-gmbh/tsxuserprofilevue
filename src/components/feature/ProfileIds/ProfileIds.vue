<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'


const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  }
})

</script>


<template>
  <ProfileDetailBox
    class="profileNaming"
  >
    <template #body>
      <div class="text-base font-medium mb-2">
        {{ t('userID') }}
      </div>
      <div class="text-sm text-gray-600">
        {{ userData.nixstatsId }}
      </div>
    </template>
  </ProfileDetailBox>
</template>
