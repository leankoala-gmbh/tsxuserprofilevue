import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PlanSelector from './PlanSelector.vue'

describe('PlanSelector.vue', () => {
  it('should render', () => {
    const wrapper = mount(PlanSelector)
    expect(wrapper).toBeTruthy()
  })
})
