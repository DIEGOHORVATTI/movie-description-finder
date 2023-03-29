import { useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'

type Props = {
  children: ReactNode
}

export default function AuthGuard({ children }: Props) {
  const { pathname, push } = useRouter()

  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  )

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null)
      push(requestedLocation)
    }
  }, [pathname, push, requestedLocation])

  return <>{children}</>
}
