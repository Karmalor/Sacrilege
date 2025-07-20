'use client'

import MuxPlayer from '@mux/mux-player-react'

import { LucidePlay, LucideX } from 'lucide-react'
import React, { useState } from 'react'
import { UrlWithStringQuery, Url } from 'url'

const VideoModal = ({ url }: { url: string }) => {
  const [modal, setModal] = useState(false)

  const [hostname, pathAndQuery] = url.split('https://player.mux.com/')
  const [path] = pathAndQuery.split('?')

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <div>
      <button
        onClick={toggleModal}
        className="flex gap-2 p-2 m-4 border-2 border-white w-24  items-center justify-center hover:bg-white hover:text-black"
      >
        Play <LucidePlay />
      </button>

      {modal && (
        <div>
          <div className="fixed w-full h-full z-40">
            <div onClick={toggleModal} className="left-0 right-0 top-0 bottom-0 fixed z-20"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[40] w-full md:w-[80%]">
              <MuxPlayer
                theme="classic"
                streamType="on-demand"
                playbackId={path}
                metadataVideoTitle="TeaserFest 2025 Promo"
                // metadataViewerUserId={user?.primaryEmailAddress?.emailAddress}
                primaryColor="#FE3D02"
                accentColor="#FFF0F0"
                // thumbnailTime={4}
                style={{
                  aspectRatio: 16 / 9,
                }}
                autoPlay
              />
              <button
                onClick={toggleModal}
                className="absolute top-2 left-2 opacity-30 hover:opacity-100"
              >
                <LucideX size={24} color="#FFF0F0" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoModal
