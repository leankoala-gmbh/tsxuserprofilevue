import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MonitorAdditionInfo from './MonitorAdditionInfo.vue'

describe('MonitorAdditionInfo', () => {
  it('renders with default props', () => {
    const wrapper = mount(MonitorAdditionInfo, {
      props: {
        status: 'info',
        link: 'https://example.com',
        priceDisplay: '$10.00',
        totalDisplay: '$100.00',
        quantity: 1,
        statusHeadline: 'Headline',
        statusText: 'Text'
      },
      global: {
        stubs: {
          QuantitySelector: true,
          AnnotationBox: true,
          PaymentMethod: true,
          GeneralButton: true,
          CleverBridgeInfo: true
        },
        mocks: {
          $t: (msg: string) => msg
        }
      }
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Headline')
    expect(wrapper.text()).toContain('Text')
    expect(wrapper.text()).toContain('x $10.00')
    expect(wrapper.text()).toContain('$100.00/mo')
  })
})

