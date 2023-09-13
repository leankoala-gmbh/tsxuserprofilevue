<script lang="ts" setup>
import ProfileBoxHeader from './ProfileBoxHeader.vue'
import { logEvent } from 'histoire/client'
</script>

<docs lang="md">
   A header component for the profile cards, with a close button
</docs>

<template>
  <Story
    title="pure/ProfileBoxHeader"
  >
    <ProfileBoxHeader @close="logEvent">
      Hello World
    </ProfileBoxHeader>
  </Story>
</template>

