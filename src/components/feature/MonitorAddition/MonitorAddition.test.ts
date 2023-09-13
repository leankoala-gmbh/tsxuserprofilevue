import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonitorAddition from './MonitorAddition.vue'

describe('MonitorAddition.vue', () => {
  it('should render', () => {
    const wrapper = mount(MonitorAddition)
    expect(wrapper).toBeTruthy()
  })
})
