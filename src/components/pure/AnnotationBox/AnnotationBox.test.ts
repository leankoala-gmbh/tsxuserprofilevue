import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AnnotationBox from './AnnotationBox.vue'

describe('MessageBox', () => {
  test('renders with default type', () => {
    const wrapper = mount(AnnotationBox)
    expect(wrapper.classes()).toContain('annotationBox--success')
  })

  test('renders with provided type', () => {
    const wrapper = mount(AnnotationBox, {
      props: {
        type: 'error'
      }
    })
    expect(wrapper.classes()).toContain('annotationBox--error')
  })

  test('renders slot content', () => {
    const wrapper = mount(AnnotationBox, {
      slots: {
        default: 'Test Content'
      }
    })
    expect(wrapper.text()).toBe('Test Content')
  })
})
