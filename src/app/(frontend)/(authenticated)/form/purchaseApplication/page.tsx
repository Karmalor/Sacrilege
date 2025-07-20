import { getPayload } from 'payload'
import React from 'react'
import configPromise from '@payload-config'
import { getUser } from '../../_actions/getUser'
import { Media, TicketType } from '@/payload-types'
import Checkout from './_components/Checkout'
import { notFound, redirect } from 'next/navigation'
import { createPaymentIntent } from './_actions/actions'
import Image from 'next/image'

const page = async () => {
  const payload = await getPayload({ config: configPromise })

  // const { ticketTypeId } = params

  let ticketType: TicketType | null = null

  // get the user
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  try {
    const res: TicketType = await payload.findByID({
      collection: 'ticketTypes',
      //   id: ticketTypeId,
      id: '1',
      overrideAccess: false,
      user: user,
    })

    ticketType = res
  } catch (err) {
    console.log('Failed to fetch TicketType', err)
    return notFound()
  }

  const { clientSecret, ticketId } = await createPaymentIntent(ticketType, user)

  if (!ticketType || !clientSecret) {
    return notFound()
  }

  return (
    <div className="mt-24 mx-4">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{ticketType?.title}</h2>
            <p>{ticketType?.description}</p>
            {ticketType?.price && (
              <p className="text-teal-499 text-xl font-bold mt-4">
                ${new Intl.NumberFormat('en-us').format(ticketType?.price)}
              </p>
            )}
          </div>
          <div className="flex-1 relative aspect-square overflow-hidden">
            <Image
              src={(ticketType.image as Media).url || ''}
              alt={ticketType.description}
              fill
              className="object-cover rounded"
            />
          </div>
        </div>
      </div>
      {/* Add checkout process */}
      <div className="m-4">
        <Checkout clientSecret={clientSecret} ticketId={ticketId} ticketType={ticketType} />
      </div>
    </div>
  )
}

export default page
