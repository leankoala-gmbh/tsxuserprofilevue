import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PaymentMethod from './PaymentMethod.vue'

describe('PaymentMethod.vue', () => {
  it('should render', () => {
    const wrapper = mount(PaymentMethod)
    expect(wrapper).toBeTruthy()
  })
})
