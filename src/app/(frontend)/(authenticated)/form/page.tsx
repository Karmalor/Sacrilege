import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { Item } from '@radix-ui/react-select'
import { headers as getHeaders } from 'next/headers.js'
import { Textarea } from '@/components/ui/textarea'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  const performanceVideos = await payload.find({
    collection: 'performanceVideos',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
    },
  })

  const formSubmissionData = await payload.find({
    collection: 'applicants',

    where: {
      id: {
        equals: '3',
      },
    },
    select: {
      submissionData: {
        field: true,
        id: true,
        value: true,
      },
    },
  })
  // const formSubmissionData2 = await payload.findByID({
  //   collection: 'form-submissions',
  //   id: 3,
  // })

  // console.log('user', user)
  // console.log('form', formSubmissionData2)

  // formSubmissionData.docs[0].submissionData?.map((id) => {
  //   console.log('here', id)
  // })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>hello</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="performanceVideos"
          currentPage={performanceVideos.page}
          limit={12}
          totalDocs={performanceVideos.totalDocs}
        />
      </div>

      {/* <CollectionArchive posts={performanceVideos.docs} /> */}
      <div className="w-1/2 m-16">
        {/* {formSubmissionData2.submissionData?.map((item, index) => (
          <div key={index} className="flex">
            <h2>{item.field}</h2>
            <Textarea placeholder={item.field} className="w-1/4" defaultValue={item.value} />
          </div>
        ))} */}
      </div>

      <div className="container">
        {performanceVideos.totalPages > 1 && performanceVideos.page && (
          <Pagination page={performanceVideos.page} totalPages={performanceVideos.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
