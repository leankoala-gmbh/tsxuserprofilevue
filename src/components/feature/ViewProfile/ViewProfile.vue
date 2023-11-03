<script lang="ts" setup>
import { IProfileUser } from '@/types/general.interfaces'

const props = defineProps({
  userData: {
    type: Object as () => IProfileUser,
    default: () => ({})
  },
  inactiveFields: {
    type: Array as () => string[],
    default: () => []
  },
  localeSavingUrl: {
    type: String,
    default: ''
  },
  currentLang: {
    type: String,
    default: 'en'
  }
})

const boxToOpen = ref<string|null>(null)

const checkRoute = () => {
  const query = window.location.hash?.length ? window.location.hash.slice(1) : null
  const routeTargets = ['naming', 'password', 'remove', 'license']
  if (query && routeTargets.includes(query)) {
    boxToOpen.value = query
  }
}

const profileLang = ref(props.currentLang)

onMounted(() => {
  checkRoute()
})

const userDataObj = ref<IProfileUser>({})
userDataObj.value = { ...props.userData }

const updateName = (payload: {firstName: string, familyName: string}) => {
  userDataObj.value.firstName = payload.firstName
  userDataObj.value.familyName = payload.familyName
}
const updateTimezone = (payload: {timezone: string}) => {
  userDataObj.value.timezone = payload.timezone
}
</script>

<template>
  <template v-if="Object.keys(userDataObj).length">
    <ProfileNaming
      v-if="!inactiveFields.includes('naming')"
      :user-data="userDataObj"
      :open="boxToOpen === 'naming'"
      @update="updateName"
    />
    <ProfileIds
      v-if="!inactiveFields.includes('ids')"
      :user-data="userDataObj"
    />
    <ProfilePassword
      v-if="!inactiveFields.includes('password')"
      id="password"
      :user-data="userDataObj"
      :open="boxToOpen === 'password'"
    />
    <div class="flex flex-col gap-2 w-full @[850px]/tsxupmain:flex-row">
      <ProfileLanguage
        v-if="!inactiveFields.includes('language')"
        class="@[850px]/tsxupmain:w-1/2"
        :current-lang="profileLang"
        :locale-saving-url="props.localeSavingUrl"
      />
      <ProfileTimezone
        v-if="!inactiveFields.includes('timezone')"
        id="timezone"
        class="@[850px]/tsxupmain:w-1/2"
        :user-data="userDataObj"
        @update="updateTimezone"
      />
    </div>

    <ProfileConsent
      v-if="!inactiveFields.includes('consent')"
      id="consent"
      :user-data="userDataObj"
    />
    <ProfileRemove
      v-if="!inactiveFields.includes('removeAccount')"
      id="remove"
      :user-data="userDataObj"
      :open="boxToOpen === 'remove'"
    />
  </template>
</template>
