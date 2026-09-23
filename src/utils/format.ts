const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })

export function formatBRL(amount: number): string {
  return brl.format(amount)
}

const WA_PHONE = '5514998040306'

export function waLink(message: string): string {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`
}
