<script lang="ts" setup>

const buyFreshLicense = () => {
  window.mitt.emit(props.contentScreenKey, {
    contentUrl: props.cleverbridgeUrl,
    type: 'content',
    title: t('upgradeAccount')
  })
}
</script>

<template>
  <GeneralButton @click="buyFreshLicense">
    {{ t('buyLicense') }}
  </GeneralButton>
</template>
