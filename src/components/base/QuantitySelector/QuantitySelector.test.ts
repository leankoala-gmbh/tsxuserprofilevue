import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import QuantitySelector from './QuantitySelector.vue'

// handleMinusQuantity
// handleInputQuantity
// handlePlusQuantity

describe('QuantitySelector.vue', () => {
  it('renders with default props and displays correct initial value', () => {
    const wrapper = mount(QuantitySelector)
    expect(wrapper.find('input').element.value).toBe('1')
  })

  it('updates quantity value and emits changeQuantity event on plus button click', async () => {
    const wrapper = mount(QuantitySelector)
    await wrapper.find('button[aria-label="handlePlusQuantity"]').trigger('click')
    expect(wrapper.find('input').element.value).toBe('2')
    expect(wrapper.emitted()).toHaveProperty('changeQuantity')
    expect(wrapper.emitted().changeQuantity[0]).toEqual([2])
  })

  it('updates quantity value and emits changeQuantity event on minus button click', async () => {
    const wrapper = mount(QuantitySelector, {
      props: { value: 2 }
    })

    await wrapper.find('button[aria-label="handleMinusQuantity"]').trigger('click')
    expect(wrapper.find('input').element.value).toBe('1')
    expect(wrapper.emitted()).toHaveProperty('changeQuantity')
    expect(wrapper.emitted().changeQuantity[0]).toEqual([1])
  })

  it('displays error message when quantity is out of range', async () => {
    const wrapper = mount(QuantitySelector, {
      props: { min: 1, max: 5, value: 6 }
    })
    await nextTick()
    expect(wrapper.text()).toContain('Must be between')
  })
})
