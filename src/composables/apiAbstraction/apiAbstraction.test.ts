import { beforeAll, describe, expect, it } from 'vitest'
import { useApiAbstraction } from './apiAbstraction'

describe('useApiAbstraction composable', async () => {
  beforeAll(() => {
    useApiAbstraction().setBaseUrl('https://monitoring.my-hosting.world/license')
  })

  it('should the Guard breaks if no base URL is defined', async () => {
    const { getLicenses } = useApiAbstraction()
    const result = await getLicenses()
    expect(result[0].activationCode).equal('A00N00-7RHN09-HAAK55-K12934-MX8438')
  })
})

