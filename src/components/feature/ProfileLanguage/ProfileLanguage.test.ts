import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileLanguage from './ProfileLanguage.vue'

describe('ProfileLanguage.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfileLanguage)
    expect(wrapper).toBeTruthy()
  })
})
