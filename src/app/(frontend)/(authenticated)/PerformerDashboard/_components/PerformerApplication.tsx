'use client'

import React, { useEffect, useState } from 'react'

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { UploadDropzone } from '@uploadthing/react'
import { toast } from '@payloadcms/ui'
import { UploadField } from './_fields/UploadField'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { getDefaultValue } from 'payload'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'

interface PerformerApplicationProps {
  form: FormType
  prefilledData?: any
}

const PerformerApplication = ({ form, prefilledData }: PerformerApplicationProps) => {
  //   const [cmsForm, setCmsForm] = useState<any>(null)

  let outputData = {}

  if (Array.isArray(prefilledData)) {
    outputData = prefilledData.reduce((acc, item) => {
      acc[item.field] = item.value
      return acc
    }, {})
  }
  console.log('prefilledData', prefilledData)

  console.log('output data', outputData)

  const formData = useForm({
    defaultValues: outputData,
  })

  return (
    <div className="w-full flex justify-center ">
      <Form {...formData}>
        <form>
          <fieldset disabled={false} className="space-y-8">
            {form.fields.map((item: any, index) => (
              <FormField
                key={item.id}
                control={item.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <Label>{item.label}</Label>

                    {/* <FormLabel>{field.label}</FormLabel> */}
                    <FormControl>
                      {/* <Input placeholder={field.name} {...field} className="" /> */}
                      {item.blockType === 'textarea' ? (
                        <Textarea
                          {...field}
                          name={field.name}
                          id={field.name}
                          // defaultValue={prefilledData?.submissionData?.[index + 1]?.value || ''}
                        />
                      ) : item.blockType === 'upload' ? (
                        <UploadField
                          {...field}
                          name="upload"
                          // defaultValue={prefilledData?.submissionData?.[index + 1]?.value || ''}
                          width={100}
                          required={true}
                        />
                      ) : (
                        <Input
                          {...field}
                          type={item.blockType}
                          name={field.name}
                          id={field.name}
                          // defaultValu  e={prefilledData?.submissionData?.[index + 1]?.value || ''}
                        />
                      )}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {/* {form?.fields?.map((field: any, index) => (
              <div key={field.id}>
                <Label>{field.label}</Label>
                {field.blockType === 'textarea' ? (
                  <Textarea
                    name={field.name}
                    id={field.name}
                    // defaultValue={prefilledData?.submissionData?.[index + 1]?.value || ''}
                  />
                ) : field.blockType === 'upload' ? (
                  <UploadField
                    name="upload"
                    // defaultValue={prefilledData?.submissionData?.[index + 1]?.value || ''}
                    label="hi hi"
                    width={100}
                    required={true}
                  />
                ) : (
                  <Input
                    type={field.blockType}
                    name={field.name}
                    id={field.name}
                    // defaultValu  e={prefilledData?.submissionData?.[index + 1]?.value || ''}
                  />
                )}
              </div>
            ))} */}

            <Button
              type="submit"
              // onClick={handleSubmitForm}
            >
              Submit
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  )
}

export default PerformerApplication
