import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonitorAdditionConfirm from './MonitorAdditionConfirm.vue'

describe('MonitorAdditionConfirm.vue', () => {
  it('should render', () => {
    const wrapper = mount(MonitorAdditionConfirm, {
      props:{
        quantity: 2,
        size:{
          count: 4,
          min: 1,
          max: 10
        }
      }
    })
    expect(wrapper).toBeTruthy()
  })

  it('should show the correct new Quantity Confirmation', () => {
    const wrapper = mount(MonitorAdditionConfirm, {
      props:{
        quantity: 4,
        size:{
          count: 1,
          min: 1,
          max: 10
        }
      }
    })
    expect(wrapper.text()).toContain('5')
  })
})
