import { getPayload } from 'payload'
import React, { ReactElement } from 'react'
import config from '@payload-config'
import LoginForm from './_components/LoginForm'

const page = async (): Promise<ReactElement> => {
  //   const payload = await getPayload({ config })

  return (
    <div className="h-[calc(100vh-3rem)]">
      <LoginForm />
    </div>
  )
}

export default page
