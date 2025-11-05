import { describe, it, expect } from 'vitest'
import date from './date'

describe('date', () => {
  it('should be an instance of PluginDate', () => {
    expect(date.constructor.name).toBe('PluginDate')
  })

  it('should have a today value', () => {
    expect(date.getValue('today')).toBeInstanceOf(Date)
  })

  it('should have a tomorrow value', () => {
    expect(date.getValue('tomorrow')).toBeInstanceOf(Date)
  })
})
