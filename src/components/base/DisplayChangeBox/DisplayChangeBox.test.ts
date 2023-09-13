import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DisplayChangeBox from './DisplayChangeBox.vue'

describe('DisplayChangeBox.vue', () => {
  it('should render', () => {
    const wrapper = mount(DisplayChangeBox)
    expect(wrapper).toBeTruthy()
  })
  it('should render text', () => {
    const wrapper = mount(DisplayChangeBox, {
      props:{
        title: 'This is a title',
        start: 'Start Text',
        target: 'Target Text'
      }
    })
    expect(wrapper).toMatchSnapshot()
  })
})
