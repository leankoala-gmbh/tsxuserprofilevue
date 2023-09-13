import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileNaming from './ProfileNaming.vue'

describe('ProfileNaming.vue', () => {
  it('should render', () => {
    const wrapper = mount(ProfileNaming)
    expect(wrapper).toBeTruthy()
  })

  it('should update input values correctly', () => {
    const wrapper = mount(ProfileNaming, {
      props:{
        userData:{
          firstName: 'firstName',
          familyName: 'familyName'
        }
      }
    })
    expect(wrapper.text()).toContain('firstName')
    expect(wrapper.text()).toContain('familyName')
  })

  it('should update input values correctly', async () => {
    const wrapper = mount(ProfileNaming, {
      props:{
        userData:{
          firstName: 'firstNameOld',
          familyName: 'familyNameOld'
        }
      }
    })

    const firstName = wrapper.find('input[name="firstname"]')
    const familyName = wrapper.find('input[name="familyName"]')
    await firstName.setValue('firstNameNew')
    await familyName.setValue('familyNameNew')
    //TODO look into TS
    expect(firstName.element.value).toContain('firstNameNew')
    expect(familyName.element.value).toContain('familyNameNew')
  })
})
