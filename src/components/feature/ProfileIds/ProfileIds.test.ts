import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileIds from './ProfileIds.vue'

describe('ProfileIds.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfileIds)
    expect(wrapper).toBeTruthy()
  })
})
