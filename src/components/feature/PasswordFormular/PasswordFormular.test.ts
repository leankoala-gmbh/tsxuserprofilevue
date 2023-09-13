import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PasswordFormular from './PasswordFormular.vue'

describe('PasswordFormular.vue', () => {
  it('should render', () => {
    const wrapper = mount(PasswordFormular)
    expect(wrapper).toBeTruthy()
  })
})
