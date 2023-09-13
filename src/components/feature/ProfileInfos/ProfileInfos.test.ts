import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import ProfileInfos from './ProfileInfos.vue'

describe('ProfileInfos.vue', () => {
  const userInfo = {
    url: 'https://test.webpros.com/profileAvatar.png',
    name: 'Webpros Rocks',
    email: 'test@webpros.com'
  }

  it('does not display the email section inactive', () => {
    const wrapper = mount(ProfileInfos, {
      propsData: {
        inactiveFields: ['avatar', 'email'],
        userData: {
          email: userInfo.email
        }
      }
    })
    expect(wrapper.text()).not.toContain(userInfo.email)
  })

  it('displays the email section when active', () => {
    const wrapper = mount(ProfileInfos, {
      propsData: {
        inactiveFields: ['avatar'],
        userData: {
          email: userInfo.email
        }
      }
    })
    expect(wrapper.text()).toContain(userInfo.email)
  })

  it('does not display the avatar section inactive', () => {
    const wrapper = mount(ProfileInfos, {
      propsData: {
        inactiveFields: ['avatar', 'email'],
        userData: {
          avatar: userInfo.url,
          name: userInfo.name
        }
      }
    })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(false)
  })

  it("displays the user's name", () => {
    const wrapper = mount(ProfileInfos, {
      propsData: {
        inactiveFields: ['email'],
        userData: {
          name: userInfo.name
        }
      }
    })

    const initials = wrapper.find('.customAvatar')

    expect(initials.text()).toBe('WR')
  })

  it("displays the user's avatar image", () => {
    const wrapper = mount(ProfileInfos, {
      propsData: {
        inactiveFields: ['email'],
        userData: {
          avatar: userInfo.url,
          name: userInfo.name
        }
      }
    })
    const img = wrapper.find('img')
    expect(img.attributes().src).toBe(userInfo.url)
    expect(img.exists()).toBe(true)
  })
})
