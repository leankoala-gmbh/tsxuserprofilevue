import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ErrorMessage from './ErrorMessage.vue'

describe('ErrorMessage.vue', () => {
  test('check snapshpt', () => {
    const wrapper = mount(ErrorMessage, {
      slots: {
        default: 'Error message'
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
