import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ViewLicense from './ViewLicense.vue'

describe('ViewLicense.vue', () => {
  it('should render', () => {
    const wrapper = mount(ViewLicense)
    expect(wrapper).toBeTruthy()
  })
})
