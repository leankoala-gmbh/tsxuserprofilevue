import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileTimezone from './ProfileTimezone.vue'

describe('ProfileTimezone.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfileTimezone)
    expect(wrapper).toBeTruthy()
  })
})
