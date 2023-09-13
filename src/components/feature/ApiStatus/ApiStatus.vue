<script lang="ts" setup>

</script>

<template>
  <div v-if="$slots.default" class="apiStatus text-xs bg-red-700 text-white p-4 my-4 border border-red-900">
    <p>{{ t('apiStatusError') }}</p>
    <slot />
  </div>
</template>
