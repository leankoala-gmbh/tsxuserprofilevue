import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileAvatar from './ProfileAvatar.vue'

describe('ProfileAvatar', () => {
  test('renders gravatar image if available', () => {
    const wrapper = mount(ProfileAvatar, {
      props: {
        userData: {
          gravatar: 'https://example.com/avatar.jpg'
        }
      }
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/avatar.jpg')
  })

  test('renders name initials if gravatar is not available', () => {
    const wrapper = mount(ProfileAvatar, {
      props: {
        userData: {
          firstName: 'John',
          familyName: 'Doe'
        }
      }
    })
    const initialsDiv = wrapper.find('.customAvatar')
    expect(initialsDiv.text()).toBe('JD')
  })

})
