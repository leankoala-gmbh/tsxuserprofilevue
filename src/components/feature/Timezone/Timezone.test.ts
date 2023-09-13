import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Timezone from './Timezone.vue'

describe('Timezone.vue', () => {
  it('should render', () => {
    const wrapper = mount(Timezone)
    expect(wrapper).toBeTruthy()
  })
  it('should not display when unchanged', () => {
    const wrapper = mount(Timezone)
    const success = () => wrapper.find('.text-signalSuccess')
    expect(success().exists()).toBe(false)
  })
  it('should display the alert when changed', async () => {
    const wrapper = mount(Timezone)
    const multiSelect = () => wrapper.find('.multiselect__input')
    const timeZoneList = () => wrapper.findAll('.multiselect__element')
    const success = () => wrapper.find('[aria-label="statusMessage"]')
    expect(success().exists()).toBe(false)
    await multiSelect().trigger('focus')
    await multiSelect().trigger('click')

    await timeZoneList()[2].trigger('focus')
    await timeZoneList()[2].trigger('click')
    expect(success().exists()).toBe(true)
  })
})
