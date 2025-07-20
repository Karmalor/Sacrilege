import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { PerformanceVideo } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<any> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/performanceVideos/${doc.slug}`

      payload.logger.info(`Revalidating performanceVideo at path: ${path}`)

      revalidatePath(path)
      revalidateTag('performanceVideos-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/performanceVideos/${previousDoc.slug}`

      payload.logger.info(`Revalidating old performanceVideo at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('performanceVideos-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<any> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/performanceVideos/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('performanceVideos-sitemap')
  }

  return doc
}
