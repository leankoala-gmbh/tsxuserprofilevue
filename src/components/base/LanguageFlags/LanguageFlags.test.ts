import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LanguageFlags from './LanguageFlags.vue'

describe('LanguageFlags.vue', () => {
  it('should render', () => {
    const wrapper = mount(LanguageFlags)
    expect(wrapper).toBeTruthy()
  })
})
