import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileRemove from './ProfileRemove.vue'

describe('ProfileRemove.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfileRemove)
    expect(wrapper).toBeTruthy()
  })
})
