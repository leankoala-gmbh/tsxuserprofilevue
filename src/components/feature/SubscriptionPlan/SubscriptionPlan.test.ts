import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubscriptionPlan from './SubscriptionPlan.vue'

describe('SubscriptionPlan.vue', () => {
  it('should render', () => {
    const wrapper = mount(SubscriptionPlan)
    expect(wrapper).toBeTruthy()
  })
})
