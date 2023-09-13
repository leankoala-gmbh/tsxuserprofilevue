import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ViewProfile from './ViewProfile.vue'

describe('ViewProfile.vue', () => {
  it('should render', () => {
    const wrapper = mount(ViewProfile)
    expect(wrapper).toBeTruthy()
  })
})
