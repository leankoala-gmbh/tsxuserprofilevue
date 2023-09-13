import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PaymentProviders from './PaymentProviders.vue'

describe('PaymentProviders.vue', () => {
  it('should render', () => {
    const wrapper = mount(PaymentProviders)
    expect(wrapper).toBeTruthy()
  })
})
