import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusMessage from './StatusMessage.vue'

describe('StatusMessage.vue', () => {
  it('should render', () => {
    const wrapper = mount(StatusMessage)
    expect(wrapper).toBeTruthy()
  })

  it('should show annotation when shoeMessageBox is true', ()=>{
    const wrapper = mount(StatusMessage, {
      slots:{
        default: 'Default slot content'
      },
      props:{
        timeout: 100
      }
    })
    expect(wrapper.text()).toContain('Default slot content')
  })
})
