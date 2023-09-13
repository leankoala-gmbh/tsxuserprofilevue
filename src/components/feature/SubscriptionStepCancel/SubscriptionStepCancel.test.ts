import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SubscriptionStepCancel from './SubscriptionStepCancel.vue'

describe('SubscriptionStepCancel.vue', () => {
  it('should render', () => {
    const wrapper = mount(SubscriptionStepCancel)
    expect(wrapper).toBeTruthy()
  })
})
