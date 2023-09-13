import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProgressBar from './ProgressBar.vue'

describe('ProgressBar.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProgressBar)
    expect(wrapper).toBeTruthy()
  })
})
