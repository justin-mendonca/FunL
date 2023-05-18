import { describe, it, expect } from 'vitest'
import ServicePicker from '../ServicePicker.vue'
import { mount } from '@vue/test-utils'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(ServicePicker, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
