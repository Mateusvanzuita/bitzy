export const WHATSAPP_NUMERO = "5511916731411" // TODO: substituir pelo número real

export function linkWhatsapp(mensagem: string) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`
}