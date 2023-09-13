import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CleverBridgeInfo from './CleverBridgeInfo.vue'

describe('CleverBridgeInfo.vue', () => {
  it('should render', () => {
    const wrapper = mount(CleverBridgeInfo)
    expect(wrapper).toBeTruthy()
  })
})
