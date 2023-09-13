<script lang="ts" setup>

type TInputType = 'text' | 'email' | 'password' | 'number' | 'url'

defineEmits(['update:modelValue'])

defineProps({
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String as () => TInputType,
    default: 'text'
  },
  inputClasses: {
    type: String,
    default: 'border p-2 w-full rounded'
  },
  errorString: {
    type: String,
    default: ''
  },
  disableAutoFocus: {
    type: Boolean,
    default: false
  }
})

const showPassword = ref(false)
</script>

<template>
  <div class="formInput">
    <div class="relative">
      <input
        :name="name"
        :value="modelValue"
        :type="type === 'password' ? (showPassword ? 'text' : 'password') : type"
        :class="[
          inputClasses,
          type === 'password' ? 'pr-8' : ''
        ]"
        @focus="disableAutoFocus ? null : ($event.target as HTMLInputElement).select()"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
      <div
        v-if="type === 'password'"
        class="absolute right-[8px] h-[40px] flex items-center top-0 text-gray-500 cursor-pointer z-10"
        @click="showPassword = !showPassword"
      >
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        ><path
           v-if="!showPassword"
           fill="currentColor"
           d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"
         />
          <path
            v-if="showPassword"
            fill="currentColor"
            d="M12 6.5c2.76 0 5 2.24 5 5c0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.14.96-.24 1.47-.24zM2.71 3.16a.996.996 0 0 0 0 1.41l1.97 1.97A11.892 11.892 0 0 0 1 11.5C2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72a.996.996 0 1 0 1.41-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5c0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57c0 1.66 1.34 3 3 3c.2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33a2.97 2.97 0 0 0-2.64-2.64l2.64 2.64z"
          />
        </svg>
      </div>
    </div>
    <ErrorMessage v-if="errorString.length" class="p-1">
      {{ errorString }}
    </ErrorMessage>
  </div>
</template>
