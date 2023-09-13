import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubscriptionStepInfo from './SubscriptionStepInfo.vue'

describe('SubscriptionStepInfo.vue', () => {
  it('should render', () => {
    const wrapper = mount(SubscriptionStepInfo)
    expect(wrapper).toBeTruthy()
  })

  it('should render the correct category', () => {
    const wrapper = mount(SubscriptionStepInfo, {
      props:{
        status: 'cancelled',
        plan: {
          keyId: 'keyId',
          keyNumber: 'keyId',
          status: 'status',
          createDate: 'createDate',
          nextBillingDate:'nextBillingDate',
          type: 'typeVitest',
          renewalCostNet: 1,
          renewalCostVat: 1,
          renewalCostGross: 1,
          renewalCurrency: 'renewalCurrency',
          billingPeriod: 'billingPeriod',
          activationCode: 'activationCode',
          changePaymentSubscriptionUrl: 'changePaymentSubscriptionUrl',
          websites: {
            count: 2,
            min: 1,
            max: 10
          },
          servers: {
            count: 2,
            min: 1,
            max: 10
          }
        }
      }
    })
    expect(wrapper.text()).toContain('typeVitest')
    expect(wrapper.find("[aria-label='changePlanDetails']").exists()).toBe(false)
  })
  it('should render the correct active category', () => {
    const wrapper = mount(SubscriptionStepInfo, {
      props:{
        status: 'active',
        plan: {
          keyId: 'keyId',
          keyNumber: 'keyId',
          status: 'status',
          createDate: 'createDate',
          nextBillingDate:'nextBillingDate',
          type: 'typeVitest',
          renewalCostNet: 1,
          renewalCostVat: 1,
          renewalCostGross: 1,
          renewalCurrency: 'renewalCurrency',
          billingPeriod: 'billingPeriod',
          activationCode: 'activationCode',
          changePaymentSubscriptionUrl: 'changePaymentSubscriptionUrl',
          websites: {
            count: 2,
            min: 1,
            max: 10
          },
          servers: {
            count: 2,
            min: 1,
            max: 10
          }
        }
      }
    })
    expect(wrapper.text()).toContain('typeVitest')
    expect(wrapper.find("[aria-label='changePlanDetails']").exists()).toBe(true)
  })
})
