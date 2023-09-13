import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubscriptionDetails from './SubscriptionDetails.vue'

describe('SubscriptionDetails.vue', () => {
  it('should render', () => {
    const wrapper = mount(SubscriptionDetails)
    expect(wrapper).toBeTruthy()
  })

  it('should render the correct license details', () => {
    const wrapper = mount(SubscriptionDetails, {
      props:{
        plan: {
          keyId: 'keyId',
          keyNumber: 'keyNumber',
          createDate: 'createDate',
          activationCode: 'activationCode'
        }
      }
    })

    expect(wrapper.text()).toContain('License Details')
    expect(wrapper.text()).toContain('Billing Details')
    expect(wrapper.text()).toContain('keyId')
    expect(wrapper.text()).toContain('keyNumber')
    expect(wrapper.text()).toContain('createDate')
    expect(wrapper.text()).toContain('activationCode')

  })
})
