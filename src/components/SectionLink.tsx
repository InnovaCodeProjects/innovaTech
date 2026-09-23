import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
  id: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export default function SectionLink({ id, className, children, onClick }: Props) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    onClick?.()

    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView()
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <a href={`/#${id}`} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
