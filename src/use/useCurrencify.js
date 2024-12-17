export default function useCurrencify(amount) {
  let posNegSymbol = ''
  if (amount > 0) posNegSymbol = '+'
  else if (amount < 0) posNegSymbol = '-'

  const currencySymbol = '₦'

  amount = Math.abs(amount)

  const amountFormatted = amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${posNegSymbol} ${currencySymbol} ${amountFormatted}`
}
