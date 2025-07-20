'use client'

import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { Suspense, useState } from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { Button } from '@/components/ui/button'
import { UploadButton, UploadDropzone } from '@/utilities/uploadthing'

export const Upload: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  } & { name: string; defaultValue: string; label: string; required: boolean; width: number }
> = ({ name, defaultValue, errors, label, register, required: requiredFromProps, width }) => {
  const [uploadedImage, setUploadedImage] = useState('')

  return (
    <Width width={width}>
      <div className="flex flex-col gap-4 items-start text-left justify-center">
        <Label htmlFor={name} className="text-left flex justify-start">
          {label}
        </Label>
        {uploadedImage ? (
          <div
            className="mt-2 flex flex-col items-center justify-center rounded-lg border border-black text-center h-[245px] px-6 py-2 ut-button:bg-black ut-label:text-black ut-ready:border-solid ut-ready:border-black ut-uploading:border-solid ut-uploading:border-black cursor-pointer
                      "
          >
            <div className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-md bg-grey-50 items-center justify-center">
              <Suspense fallback={<h1>Loading Image...</h1>}>
                <a target="_blank" href={uploadedImage} rel="noopener noreferrer">
                  <img src={uploadedImage} alt="" width={250} height={250} />
                </a>
              </Suspense>
            </div>

            <Button
              type={'button'}
              onClick={() => setUploadedImage('')}
              className="group relative mt-4 mb-4 flex h-10 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-md border-none text-base text-white after:transition-[width] after:duration-500 focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 bg-black p-4 disabled:pointer-events-none"
              data-ut-element="button"
              data-state="ready"
            >
              Change Photo
            </Button>
          </div>
        ) : (
          <UploadDropzone
            className="w-full h-[275px] ut-button:bg-black ut-label:text-black ut-ready:border-solid ut-ready:border-black ut-uploading:border-solid ut-uploading:border-black cursor-pointer"
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              console.log('Upload succdess')
              // toast({
              //   title: "Congratulations!",
              //   description: (
              //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              //       <code className="text-white">
              //         Photo uploaded successfully
              //       </code>
              //     </pre>
              //   ),
              // });
              // cmsForm.setValue('imageUrl', `${res[0].url}`)
              setUploadedImage(res[0].url)
            }}
          />
        )}
        {requiredFromProps && errors[name] && <Error />}
      </div>
    </Width>
  )
}
