import { mount } from '@vue/test-utils'
import { describe, expect, it, test } from 'vitest'
import FormInput from './FormInput.vue'

describe('FormInput.vue', () => {
  test('set a text value', async () => {
    const wrapper = mount(FormInput)
    const input = wrapper.find('input')
    await input.setValue('hello world')
    expect(input.element.value).toBe('hello world')
  })

  it('should display an Errormessage', () => {
    const wrapper = mount(FormInput, {
      props: {
        errorString: 'This is an error message'
      }
    })
    expect(wrapper.find('.errorMessage').text()).toBe('This is an error message')
  })
})
