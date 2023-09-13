export function useLocalHelper () {
  // TODO: Currency in the wrong position
  const displayPrice = (price: number, currency = 'EUR') => {
    return new Intl.NumberFormat(getLanguage(), {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol'
    }).format(price)
  }

  const displayDate = (date: string) => {
    return new Date(date).toLocaleDateString(getLanguage())
  }

  return {
    displayPrice,
    displayDate
  }
}
