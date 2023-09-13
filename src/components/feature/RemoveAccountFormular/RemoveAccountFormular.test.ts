import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RemoveAccountFormular from './RemoveAccountFormular.vue'

describe('RemoveAccountFormular.vue', () => {
  it('should render', () => {
    const wrapper = mount(RemoveAccountFormular)
    expect(wrapper).toBeTruthy()
  })
})
