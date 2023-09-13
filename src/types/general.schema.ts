import { z } from 'zod'


export const ZProfile = z.object({
  access: z.string().optional(),
  timezone: z.string().optional(),
  nickname: z.string().optional(),
  firstName: z.string(),
  familyName: z.string()
})

export type IProfile = z.infer<typeof ZProfile>


export const ZPassword = z.object({
  password: z.string()
})

export type IPassword = z.infer<typeof ZPassword>

export const ZLicensesServers = z.object({
  count: z.number(),
  min: z.number(),
  max: z.number()
})

export const ZLicenses = z.object({
  keyId: z.string(),
  keyNumber: z.string(),
  status: z.string(),
  createDate: z.string(),
  nextBillingDate: z.string(),
  type: z.string(),
  renewalCostNet: z.number(),
  renewalCostVat: z.number(),
  renewalCostGross: z.number(),
  renewalCurrency: z.string(),
  billingPeriod: z.string(),
  activationCode: z.string(),
  changePaymentSubscriptionUrl: z.string(),
  websites: ZLicensesServers,
  servers: ZLicensesServers
})

export type ILicenses = z.infer<typeof ZLicenses>

