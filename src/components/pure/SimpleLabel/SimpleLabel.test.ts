import { describe, test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SimpleLabel from './SimpleLabel.vue'

describe('SimpleLabel', () => {
  test('renders with default type', () => {
    const wrapper = shallowMount(SimpleLabel, {
      slots: {
        default: 'Main Content'
      }
    })
    expect(wrapper.classes()).toContain('simpleLabel--active')
  })

  test('renders with provided type', () => {
    const wrapper = shallowMount(SimpleLabel, {
      slots: {
        default: 'Main Content'
      },
      props: {
        type: 'inactive'
      }
    })
    expect(wrapper.classes()).toContain('simpleLabel--inactive')
  })

  test('renders slot content', () => {
    const wrapper = shallowMount(SimpleLabel, {
      slots: {
        default: 'Test Content'
      }
    })
    expect(wrapper.text()).toBe('Test Content')
  })
})
