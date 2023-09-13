import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import ApiError from './ApiError.vue'

describe('ApiError.vue', () => {
  it('renders error message if errorObj has detail', async () => {
    const errorObj = { detail: 'An error occurred' }
    const wrapper = mount(ApiError, {
      props: { errorObj }
    })

    await nextTick()

    expect(wrapper).toBeTruthy()
    expect(wrapper.text()).toContain('An error occurred')
  })

  it('renders error message if errorObj has message', async () => {
    const errorObj = { message: 'An error occurred' }
    const wrapper = mount(ApiError, {
      props: { errorObj }
    })

    await nextTick()

    expect(wrapper).toBeTruthy()
    expect(wrapper.text()).toContain('An error occurred')
  })

  it('renders violations list if errorObj has violations', async () => {
    const errorObj = {
      violations: [
        { title: 'Violation 1' },
        { title: 'Violation 2' }
      ]
    }

    const wrapper = mount(ApiError, {
      props: { errorObj }
    })

    await nextTick()

    expect(wrapper).toBeTruthy()
    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.text()).toContain('Violation 1')
    expect(wrapper.text()).toContain('Violation 2')
  })

  it('does not render AnnotationBox if errorObj is empty', async () => {
    const errorObj = {}
    const wrapper = mount(ApiError, {
      props: { errorObj }
    })

    await nextTick()

    expect(wrapper.find('AnnotationBox').exists()).toBe(false)
  })
})
