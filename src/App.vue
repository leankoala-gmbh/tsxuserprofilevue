<script lang="ts" setup>
import mitt from 'mitt'

window.mitt = window.mitt || mitt()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import TSXUserProfile from './components/feature/TSXUserProfile/TSXUserProfile.ce.vue'

const userData = {
  nickName: 'blubb',
  gravatar: 'https://www.gravatar.com/avatar/1e45f0572fb68149199a0acb56ccc3dc?s=40&d=mp',
  email: 'blubb@blubber.de',
  firstName: 'Firstblubb',
  familyName: 'Lastblubb',
  timezone: 'Africa/Addis_Ababa',
  sessionToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ0ZWFtSWQiOiIyZGQ3ODM1Ni01NTdiLTQxOWMtODVkNy0yMmNhYWI0YjM2ZGIiLCJleHAiOjE2NzU2OTc3Njh9.PLDaV8wzRWEL1yUMRNGxYYwai6AYf9WwMZdQhAm7WkaVQFr4y2cgd6esjvCnolO_ummk9kaE7y9UjxM2o7G8K5KrLMFHojeaGJrPG0NKb2rHawlkHUA7Pks-z5EfksvDx0eKj5ml69OVDfL2Oe0y2EqylSaXGlsxMUstrr7DQNSY60uZ4euJqfkU8lMJ_8bsisxvHss4A-Mz-3zFm0Oqm63nlgrGjO_wGV6U9jrTXbLs2h4FlLhJMHBw1MMCCoffIF92OhA9PqpLri1LhSzD7FtvnxHI19dxz2ng2I_N0tPnr6M-K6fhRQMMAMtxT9tlsztP-SUgTGmemP7rAAIom-e9bHujj02klAoSiZ-EGeOHrQJKKjrNdlY3SyKdiTK0S2-OuydstnVme2bPv80jgDGZ2kDiYhZNgZu-HUtAJUYRWPdP4brZVfgudlh-dRlsa3bJQmS9uW4-JTHx6i0YXrLJbMY9V_tDekDjaoNQ7Iz9SPXffFjfyZO6JBj4mh1I5ICeHwAJBEOEkOQ0AUk3ApoVQVGOytDqpID3vwx0_2fd_iv2nKYWjHmnD4TFJ6dfAcusjBqyyprsmPqhdxK4hdSvr8IyhdyyinS7bCpfkAFGWHxRf53Dan7XIgROkPfIXJbW7XHPYTs-FMWkW9EPJjraADzBItW_wUInhbXEYF4',
  nixstatsId: 'testIdNixstats',
  threeSixtyId: 'threeSixtyId',
  isOauthUser: true,
  globalUserInformation: {
    isDeleteAble: true
  }
}
const inactiveFields = []

const canvasType = ref('profile')

const clickHandler = (type: string) => {
  canvasType.value = type
  window.mitt.emit('tsxUserProfile', { action: 'openCanvas', view: type })
}

window.mitt.on('tsxUserProfile', (data: { action: string }) => {
  if (data.action === 'closeCanvas') {
    canvasType.value = ''
  }
})

</script>


<template>
  <div class="p-12 bg-slate-600">
    <div class="mb-4 text-xl font-bold" @click="clickHandler('profile')">
      Profile
    </div>
    <div class="mb-4 text-xl font-bold" @click="clickHandler('license')">
      License
    </div>
    <TSXUserProfile
      :user-data="JSON.stringify(userData)"
      :inactive-fields="JSON.stringify(inactiveFields)"
      override-base-api-url="https://app.stage.360monitoring.com"
      base-api-url=""
      :off-canvas="true"
      complete-upsell-url="https://app.stage.360monitoring.com/upsell/in-app-purchase-url"
      :is-license-partner="true"
      partner-type="standalone"
      token="blubb"
    />

    <!-- <TSXUserProfile
      v-if="canvasType === 'license'"
      :inactive-fields="JSON.stringify(inactiveFields)"
      override-base-api-url="https://app.stage.360monitoring.com"
      view="license"
      base-api-url=""
      :read-only="false"
      :off-canvas="true"
    /> -->
  </div>
</template>
