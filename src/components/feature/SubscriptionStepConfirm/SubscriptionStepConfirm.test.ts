import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubscriptionStepConfirm from './SubscriptionStepConfirm.vue'

describe('SubscriptionStepConfirm.vue', () => {
  it('should render', () => {
    const wrapper = mount(SubscriptionStepConfirm)
    expect(wrapper).toBeTruthy()
  })
})
