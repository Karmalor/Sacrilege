'use server'

import { redirect } from 'next/navigation'

export async function handleLogout() {
  const res = await fetch('http://localhost:3000/api/performers/logout?allSessions=true', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res

  redirect('/')
}
