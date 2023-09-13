import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubscriptionHeader from './SubscriptionHeader.vue'

describe('SubscriptionHeader.vue', () => {
  it('should render', () => {
    const wrapper = mount(SubscriptionHeader, {
      props:{
        subscriptionDetail: {
          status: 'active',
          planName: '360 Monitoring Vitest',
          date: 'planDate'
        }
      }
    })
    expect(wrapper).toBeTruthy()
  })

  // billinDate
  // label/status
  // planName
  // price
  it('should render', () => {
    const wrapper = mount(SubscriptionHeader, {
      props:{
        subscriptionDetail: {
          status: 'active',
          planName: '360 Monitoring Vitest',
          date: 'planDate'
        }
      }
    })
    expect(wrapper.text()).toContain('360 Monitoring Vitest subscription')
  })
})
