'use client'

import { Button } from '@/components/ui/button'
import { TicketType } from '@/payload-types'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'

interface PaymentFormInterface {
  ticketType: TicketType
  ticketId: string
}

export default function PaymentForm({ ticketType, ticketId }: PaymentFormInterface) {
  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState<string>()
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    if (paymentIntent?.status === 'succeeded') {
      // wait 3 seconds
      setTimeout(() => {
        window.location.href = `${window.location.origin}/performerDashboard/${ticketId}`
      }, 3000)
    } else {
      setIsProcessing(false)
      setErrorMessage('Payment not completed. Please try again')
    }
  }

  const options = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
    },
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* @ts-ignore */}
      <PaymentElement options={options} />
      {errorMessage && <div className="text-sm">{errorMessage}</div>}
      <Button
        type="submit"
        disabled={isProcessing}
        className="w-full text-white bg-black border border-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing
          ? 'Processing...'
          : `Pay $${new Intl.NumberFormat('en-us').format(ticketType.price)}`}
      </Button>
    </form>
  )
}
