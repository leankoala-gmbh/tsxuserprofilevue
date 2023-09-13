import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GeneralButton from './GeneralButton.vue'

describe('GeneralButton.vue', () => {
  it('check snapshot', () => {
    const wrapper = mount(GeneralButton)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
