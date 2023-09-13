import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BillingLine from './BillingLine.vue'

describe('BillingLine.vue', () => {
  it('should render', () => {
    const wrapper = mount(BillingLine)
    expect(wrapper).toBeTruthy()
  })

  it('should show correct planDate and pricePlan interval', ()=>{
    const wrapper = mount(BillingLine, {
      props:{
        date: 'planDate',
        price: 10,
        currency: 'EUR'
      }
    })
    expect(wrapper.text()).toContain('planDate')
    expect(wrapper.text()).toContain('10')
    expect(wrapper.text()).toContain('€')
  })
})
