import React from 'react'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { getFormById, getFormSubmissionById } from '@/blocks/Form/actions'
import { FormBlock } from '@/blocks/Form/Component'
import { getUser } from '../../../_actions/getUser'

export default async function PerformerDashboard({
  params,
}: {
  params: Promise<{ applicationId: string }>
}) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const user = await getUser()
  const { applicationId } = await params

  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'performer-dashboard' },
    },
  })

  // const {
  //   docs: [tickets],
  // } = await payload.find({
  //   collection: 'tickets',
  //   where: {
  //     'attendee.email': { equals: user?.email },
  //   },
  // })

  if (!page) {
    return <div>Page not found</div>
  }

  const form = await getFormById('4')

  if (!form) {
    return <div>form not found</div>
  }

  const submission = await getFormSubmissionById(parseInt(applicationId))

  return (
    <div className="mt-24">
      {/* <h2>{tickets?.ticketType?.title}</h2> */}
      {/* <pre>{JSON.stringify(page.layout[0], null, 2)}</pre> */}
      {/* <Image src={page.layout[1].media.url} alt={page.title} fill /> */}
      {page.hero && (
        <MediumImpactHero
          media={page.hero.media}
          richText={page.hero.richText}
          type="mediumImpact"
        />
      )}

      {/* <RenderBlocks blocks={page.layout} /> */}
      {/* <PerformerApplication form={form} prefilledData={prefilledData.submissionData} /> */}
      {form && (
        <FormBlock
          enableIntro={true}
          //@ts-ignore
          form={form}
          submission={submission}
          user={user}
        />
      )}
      {/* <form/> */}
    </div>
  )
}
