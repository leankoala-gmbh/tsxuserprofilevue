import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonitorAdditionHeader from './MonitorAdditionHeader.vue'

describe('MonitorAdditionHeader.vue', () => {
  it('should render', () => {
    const wrapper = mount(MonitorAdditionHeader)
    expect(wrapper).toBeTruthy()
  })

  it('should show the correct price/quantity header for monitors', () => {
    const wrapper = mount(MonitorAdditionHeader, {
      prop:{
        quantity: 2,
        priceDisplay: 'priceDisplay'
      }
    })
    expect(wrapper.text()).toContain(2)
    expect(wrapper.text()).toContain('priceDisplay')
  })

})
