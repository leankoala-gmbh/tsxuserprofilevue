<script lang="ts" setup>
import MonitorBoxHeader from './MonitorBoxHeader.vue'
import { logEvent } from 'histoire/client'
</script>

<docs lang="md">
   A header component for the profile cards, with a close button
</docs>

<template>
  <Story
    title="pure/MonitorBoxHeader"
  >
    <MonitorBoxHeader @close="logEvent">
      Hello World
    </MonitorBoxHeader>
  </Story>
</template>

