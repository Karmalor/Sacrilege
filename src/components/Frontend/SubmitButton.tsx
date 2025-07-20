import React from 'react'
import { Button } from '../ui/button'
import { LucideCircle, LucideLoaderCircle } from 'lucide-react'

const SubmitButton = ({ loading, label }: { loading: boolean; label: string }) => {
  return (
    <Button type="submit" disabled={loading} className="gap-4 w-full">
      {loading ? 'Loading...' : <>{label}</>}
      <LucideLoaderCircle className={`animate-spin ${loading ? 'block' : 'hidden'}`} />
    </Button>
  )
}

export default SubmitButton
