import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubscriptionStepChange from './SubscriptionStepChange.vue'

describe('SubscriptionStepChange.vue', () => {
  it('should render', () => {
    const wrapper = mount(SubscriptionStepChange)
    expect(wrapper).toBeTruthy()
  })

  it('should have the correct planType', () => {
    const wrapper = mount(SubscriptionStepChange, {
      props:{
        plan: {
          type: 'typeVitest'
        }
      } })
    const planType = () => wrapper.find("[data-testId='planType']")
    expect(planType().text()).toContain('typeVitest')
  })
})
