<script lang="ts" setup>
const buyFreshLicense = () => {
  window.mitt.emit('tsxUserProfile', {
    action: 'buyNewLicense'
  })
}
</script>

<template>
  <GeneralButton @click="buyFreshLicense">
    {{ t('buyLicense') }}
  </GeneralButton>
</template>
