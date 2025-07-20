'use client'

import { cn } from 'src/utilities/cn'
import React from 'react'

// import type { Post } from '@/payload-types'

import { Card, CardPostData } from '@/components/Card'
import { usePathname } from 'next/navigation'

export type Props = {
  tickets: CardPostData[]
}

export const TicketArchive: React.FC<Props> = (props) => {
  const { tickets } = props

  const pathname = usePathname()

  return (
    <div className={cn('container')}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {tickets?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo={pathname} showCategories />
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
