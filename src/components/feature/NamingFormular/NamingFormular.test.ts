import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NamingFormular from './NamingFormular.vue'

describe('NamingFormular.vue', () => {
  it('should render', () => {
    const wrapper = mount(NamingFormular)
    expect(wrapper).toBeTruthy()
  })
})
