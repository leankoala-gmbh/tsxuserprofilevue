import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileConsent from './ProfileConsent.vue'

describe('ProfileConsent.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfileConsent)
    expect(wrapper).toBeTruthy()
  })
})
