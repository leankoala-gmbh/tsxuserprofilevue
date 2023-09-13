import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileBoxHeader from './ProfileBoxHeader.vue'

describe('ProfileBoxHeader', () => {
  test('renders slot content', () => {
    const wrapper = mount(ProfileBoxHeader, {
      slots: {
        default: 'Test Content'
      }
    })
    expect(wrapper.text()).toBe('Test ContentClose')
  })

  test('emits close event on button click', () => {
    const wrapper = mount(ProfileBoxHeader)
    const closeButton = wrapper.findComponent({ name: 'GeneralButton' })
    closeButton.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
