import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonitorDetailBox from './MonitorDetailBox.vue'

describe('MonitorDetailBox.vue', () => {
  it('should render', () => {
    const wrapper = mount(MonitorDetailBox)
    expect(wrapper).toBeTruthy()
  })

  it('should show default slot', () => {
    const wrapper = mount(MonitorDetailBox, {
      slots:{
        default: 'Default content slot'
      }
    })
    expect(wrapper.text()).toContain('default content slot')
  })

  it('should show body slot if exists', () => {
    const wrapper = mount(MonitorDetailBox, {
      slots:{
        default: 'Default content slot',
        body: 'body content slot'
      }
    })
    expect(wrapper.text()).toContain('body content slot')
  })

})
