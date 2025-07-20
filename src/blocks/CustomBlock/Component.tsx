import React from 'react'

// import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { cn } from '@/utilities/cn'
import { Media } from '@/components/Media'
import { StaticImageData } from 'next/image'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
  richText?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
}

export const CustomBlock: React.FC<Props> = (props) => {
  const { className, enableGutter = true, imgClassName, media, staticImage, richText } = props

  // export const CustomBlock: React.FC<any> = ({  richText }) => {
  return (
    <div className="container">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          <div
            className={cn(
              '',
              {
                container: enableGutter,
              },
              className,
            )}
          >
            {(media || staticImage) && (
              <Media
                imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
                resource={media}
                src={staticImage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
