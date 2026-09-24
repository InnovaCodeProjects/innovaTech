import { useTranslation } from 'react-i18next'
import Icon from './Icon'
import { waLink } from '../utils/format'

export default function WhatsAppButton() {
  const { t } = useTranslation()
  return (
    <a
      className="fab"
      href={waLink(t('whatsappButton.message'))}
      target="_blank"
      rel="noopener"
      aria-label={t('whatsappButton.aria') as string}
    >
      <Icon name="whatsapp" />
    </a>
  )
}
