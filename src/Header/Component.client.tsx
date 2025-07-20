'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

import gsap from 'gsap'
import { useWindowScroll } from 'react-use'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { LucideUserCircle } from 'lucide-react'
import { handleLogout } from '@/utilities/logout'
import { logout } from '@/app/(frontend)/(authenticated)/_actions/logout'
import LogoutButton from '@/components/Frontend/LogoutButton'

interface HeaderClientProps {
  data: Header
  user: any
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, user }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // GSAP animation
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavVisible, setIsNavVisible] = useState(true)

  const navContainerRef: any = useRef(null)

  const { y: currentScrollY } = useWindowScroll()

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true)
      navContainerRef.current.classList.remove('floating-nav')
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false)
      navContainerRef.current.classList.add('floating-nav')
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true)
      navContainerRef.current.classList.add('floating-nav')
    }

    setLastScrollY(currentScrollY)
  }, [currentScrollY, lastScrollY])

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    })
  }, [isNavVisible])

  return (
    // <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
    //   <div className="py-8 flex justify-between">
    //     <Link href="/">
    //       <Logo loading="eager" priority="high" className="invert dark:invert-0" />
    //     </Link>
    //     <HeaderNav data={data} />
    //   </div>
    // </header>
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-40 h-16 border-none transition-all duration-700 sm:inset-x-6 bg-black bg-opacity-40 rounded"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <Link href="/">
              <Logo loading="eager" priority="high" className="invert dark:invert-0" />
            </Link>
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              <div className="flex gap-4">
                {/* {navItems.map((item) => (
                <a key={item} className="nav-hover-btn" href={`#${item.toLowerCase()}`}>
                  {item}
                </a>
              ))} */}
                <HeaderNav data={data} />
                {user ? (
                  <Popover>
                    <PopoverTrigger>
                      <LucideUserCircle />
                    </PopoverTrigger>
                    <PopoverContent className="bg-black bg-opacity-60 border-none rounded">
                      <LogoutButton />
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Link href={'/login'}>Login</Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
