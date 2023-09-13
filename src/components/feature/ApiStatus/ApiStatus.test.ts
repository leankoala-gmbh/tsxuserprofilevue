import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ApiStatus from './ApiStatus.vue'

describe('ApiStatus.vue', () => {
  it('should render', () => {
    const wrapper = mount(ApiStatus)
    expect(wrapper).toBeTruthy()
  })
})
