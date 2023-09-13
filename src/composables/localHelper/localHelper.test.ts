import { describe, it, expect } from 'vitest'
import { useLocalHelper } from './localHelper'

describe('useLocalHelper composable', () => {
  it('should be defined', () => {
    expect(useLocalHelper).toBeDefined()
  })
})
