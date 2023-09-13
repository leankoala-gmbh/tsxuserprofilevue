export type LooseOnionString<T extends string> = T | Omit<string, T>
export interface IKeyValue { [key: string]: string }

export interface IProfileUser {
  name?: string
  email?: string
  gravatar?: string
  timezone?: null | string
  nickname?: string
  firstName?: string
  familyName?: string
  nixstatsId?: string
  threeSixstyId?: string
  sessionToken?: string
}

export interface ILicensesDetails {
  keyId: string
  keyNumber: string
  status: string
  createDate: string
  nextBillingDate:string
  type: string
  renewalCostNet: number
  renewalCostVat: number
  renewalCostGross: number
  renewalCurrency: string
  billingPeriod: string
  activationCode: string
  changePaymentSubscriptionUrl: string
  websites: ILicensesServers
  servers: ILicensesServers
  cbItemStatusId: string
}
export interface ILicenses {
  [key: string]: ILicensesDetails[]
}

export interface ILicensesServers {
  next_cycle_count: number
  count: number
  min: number
  max: number
}

export interface IApiError {
  status?: string
  message?: string
  type?: string;
  title?: string;
  detail?: string;
  violations?: {
    propertyPath: string;
    title: string;
    parameters: any[];
    type?: string;
  }[];
}

export type TPlanStatus = 'active' | 'canceled'

export interface ISubscriptionHeaderDetails {
  status: string
  planName: string
  price?: number
  date: string
  currency?: string
  licenseId?: string
}

export type TPaymentProviders = 'visa' | 'mastercard' | 'paypal' | 'sepa' | 'wire' | 'amex'

export interface IPlansNew {
  productName: string;
  extensionCatalogCode: string;
  currency: string;
  billingPeriod: string;
  changePaymentUrl: string;
  upsells: IPlansUpsells[];
}

export interface IPlanUpsellsFull {
  productName: string
  upsells: IPlansUpsells[]
}

export interface IPlansUpsells {
  productId: string;
  planId: string;
  productName: string;
  alignmentGrossPrice: number;
  alignmentVatPrice: number;
  alignmentNetPrice: number;
  nextBillingGrossPrice: number;
  nextBillingVatPrice: number;
  nextBillingNetPrice: number;
  nextBillingDate: string;
}

export interface IPlanPricing {
  net: number
  vat: number
  gross: number
  currency: string
}
export interface IPlanSelector {
  id: string
  name: string
  upgradeable: string[]
  downgradable: string[]
  upsells: []
  price: IPlanPricing
}
export interface IPlans {
  planOrder: string[]
  plans: IPlanUpsellsFull[]
}

export type TMonitorTypes = 'servers' | 'websites'
export type TMonitorStatus = 'info' | 'confirm' | 'summary'
export type IMonitorStatusTitle = {
  [key in TMonitorTypes]: {
    [key in TMonitorStatus]?: string
  }
}

export interface IPrices {
  alignmentGrossPrice:number
  alignmentVatPrice:number
  alignmentNetPrice:number
  nextBillingGrossPrice:number
  nextBillingVatPrice:number
  nextBillingNetPrice:number
  currency: string
  resultMessage: string
  nextBillingDate: string
  changePaymentUrl: string
  merchantOfRecordType: string
}

export interface IPricesSmall {
  gross: number,
  vat: number,
  net: number
}

export interface ILicenseCache {
  [keyId : string]: {
    websites: number
    servers: number
    websitesDiff: number
    serversDiff: number
    websitesNextCycle: number
    serversNextCycle: number
  }
}
