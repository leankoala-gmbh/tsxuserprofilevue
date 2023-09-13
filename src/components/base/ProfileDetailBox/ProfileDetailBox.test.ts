import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileDetailBox from './ProfileDetailBox.vue'

describe('ProfileDetailBox.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfileDetailBox)
    expect(wrapper).toBeTruthy()
  })

  it('should show default slot', () => {
    const wrapper = mount(ProfileDetailBox, {
      slots:{
        default: 'Default content slot'
      }
    })
    expect(wrapper.text()).toContain('default content slot')
  })

  it('should show body slot if exists', () => {
    const wrapper = mount(ProfileDetailBox, {
      slots:{
        default: 'Default content slot',
        body: 'body content slot'
      }
    })
    expect(wrapper.text()).toContain('body content slot')
  })

})
