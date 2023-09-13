<script lang="ts" setup>
import ProfileAvatar from './ProfileAvatar.vue'

const userData1 = {
  gravatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
}
const userData2 = {
  firstName: 'John',
  familyName: 'Doe'
}
</script>

<docs lang="md">
  Lorem ipsum
</docs>

<template>
  <Story
    title="pure/ProfileAvatar"
  >
    <Variant title="with image">
      <ProfileAvatar :user-data="userData1" />
    </Variant>
    <Variant title="with initials">
      <ProfileAvatar :user-data="userData2" />
    </Variant>
  </Story>
</template>

