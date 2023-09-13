import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonitorBoxHeader from './MonitorBoxHeader.vue'

describe('MonitorBoxHeader.vue', () => {
  it('should render', () => {
    const wrapper = mount(MonitorBoxHeader)
    expect(wrapper).toBeTruthy()
  })

  it('it should render the slot', () => {
    const wrapper = mount(MonitorBoxHeader, {
      slots:{
        default: 'Default content'
      }
    })
    expect(wrapper.text()).toContain('Default content')
  })
})
