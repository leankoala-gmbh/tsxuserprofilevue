import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfilePassword from './ProfilePassword.vue'

describe('ProfilePassword.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfilePassword)
    expect(wrapper).toBeTruthy()
  })
})
