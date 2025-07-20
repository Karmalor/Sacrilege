import React from 'react'
import { headers as getHeaders } from 'next/headers.js'
import config from '@/payload.config'
import { getPayload, Where } from 'payload'
import { getUser } from '../_actions/getUser'
import { Page, TicketTypesSelect } from '@/payload-types'
import { HighImpactHero } from '@/heros/HighImpact'
import Image from 'next/image'
import { Media } from '@/components/Media'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { getFormById, getFormSubmissionById } from '@/blocks/Form/actions'
import { FormBlock } from '@/blocks/Form/Component'
import PerformerApplication from './_components/PerformerApplication'

export default async function PerformerDashboard() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const user = await getUser()

  const {
    docs: [page],
  } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'performer-dashboard' },
    },
  })

  const {
    docs: [tickets],
  } = await payload.find({
    collection: 'tickets',
    where: {
      'attendee.email': { equals: user?.email },
    },
  })

  if (!page) {
    return <div>Page not found</div>
  }

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

      <RenderBlocks blocks={page.layout} />
    </div>
  )
}
