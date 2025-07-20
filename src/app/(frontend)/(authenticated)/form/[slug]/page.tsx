import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PostHero } from '@/heros/PostHero'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ApplicationPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  // const url = '/performanceVideos/' + slug
  // const performanceVideo = await queryPostBySlug({ slug })

  // if (!performanceVideo) return <PayloadRedirects url={url} />
  const payload = await getPayload({ config: configPromise })

  const formSubmissionData = await payload.findByID({
    collection: 'applicants',
    id: slug,
  })

  // const revision = await payload.update({
  //   collection: 'form-submissions',
  //   id: slug,
  //   data: {
  //     id: 4,
  //   },
  // })

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      <div className="w-1/2 m-16">
        {/* {formSubmissionData.submissionData?.map((item, index) => (
          <div key={index} className="flex m-4 items-center">
            <h2 className="w-[200px]">{item.field}</h2>
            <Input placeholder={item.field} className="w-1/4" defaultValue={item.value} />
          </div>
        ))} */}
        {/* <PerformerApplication formId="4" /> */}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  // @ts-ignore
  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const formSubmissionData = await payload.findByID({
    collection: 'applicants',
    id: slug,
  })

  // const result = await payload.find({
  //   collection: 'form-submissions',
  //   draft,
  //   limit: 1,
  //   overrideAccess: draft,
  //   pagination: false,
  //   where: {
  //     id: {
  //       equals: slug,
  //     },
  //   },
  // })

  // const formSubmissionData = await payload.find({
  //   collection: 'form-submissions',

  //   select: {
  //     submissionData: {
  //       field: true,
  //       id: true,
  //       value: true,
  //     },
  //   },
  // })

  return
  // result.docs?.[0] || null
})
