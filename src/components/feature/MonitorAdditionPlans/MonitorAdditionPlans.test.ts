import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonitorAdditionPlans from './MonitorAdditionPlans.vue'

describe('MonitorAdditionPlans.vue', () => {
  it('should render', () => {
    const wrapper = mount(MonitorAdditionPlans)
    expect(wrapper).toBeTruthy()
  })
})
