import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BuyLicenseButton from './BuyLicenseButton.vue'

describe('BuyLicenseButton.vue', () => {
  it('should render', () => {
    const wrapper = mount(BuyLicenseButton)
    expect(wrapper).toBeTruthy()
  })
})
