import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header({ user }: { user: any }) {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return <HeaderClient data={headerData} user={user} />
}
