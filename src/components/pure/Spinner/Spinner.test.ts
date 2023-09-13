import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Spinner from './Spinner.vue'

describe('Spinner.vue', () => {
  it('should render', () => {
    const wrapper = mount(Spinner)
    expect(wrapper).toBeTruthy()
  })
})
