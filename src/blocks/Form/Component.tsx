'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import type { Media as MediaType } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { AnimateIn } from '@/components/AnimateIn'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
  image?: number | MediaType | null
  imagePosition?: 'left' | 'right' | 'background' | null
  backgroundColor?: string | null
}

export const FormBlock: React.FC<{ id?: string } & FormBlockType> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    image,
    imagePosition = 'left',
    backgroundColor,
  } = props

  const formMethods = useForm({ defaultValues: formFromProps.fields })
  const { control, formState: { errors }, handleSubmit, register } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)
        const dataToSend = Object.entries(data).map(([name, value]) => ({ field: name, value }))

        loadingTimerID = setTimeout(() => setIsLoading(true), 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({ form: formID, submissionData: dataToSend }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          })
          const res = await req.json()
          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)
            setError({ message: res.errors?.[0]?.message || 'Internal Server Error', status: res.status })
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect?.url) {
            router.push(redirect.url)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({ message: 'Something went wrong.' })
        }
      }
      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  const hasImage = Boolean(image && typeof image === 'object')
  const isBgImage = hasImage && imagePosition === 'background'
  const isSideImage = hasImage && (imagePosition === 'left' || imagePosition === 'right')

  // ── Form content (shared between both layouts) ──────────────────────────────
  const formContent = (
    <FormProvider {...formMethods}>
      {!isLoading && hasSubmitted && confirmationType === 'message' && (
        <RichText data={confirmationMessage} />
      )}
      {isLoading && !hasSubmitted && (
        <p className="text-muted-foreground">Loading, please wait…</p>
      )}
      {error && (
        <div className="mb-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error.status || '500'}: {error.message}
        </div>
      )}
      {!hasSubmitted && (
        <form id={formID} onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 last:mb-0">
            {formFromProps?.fields?.map((field, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
              if (Field) {
                return (
                  <div className="mb-6 last:mb-0" key={index}>
                    <Field form={formFromProps} {...field} {...formMethods} control={control} errors={errors} register={register} />
                  </div>
                )
              }
              return null
            })}
          </div>
          <Button form={formID} type="submit" variant="default">
            {submitButtonLabel}
          </Button>
        </form>
      )}
    </FormProvider>
  )

  // ── Background image layout ────────────────────────────────────────────────
  if (isBgImage) {
    return (
      <div className="relative w-full overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Media
            resource={image}
            fill
            htmlElement={null}
            imgClassName="object-cover"
            pictureClassName="absolute inset-0 w-full h-full"
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Form on top */}
        <div className="relative z-10 container py-20 md:py-28">
          <AnimateIn variant="fade-up">
            <div className="mx-auto max-w-xl">
              {enableIntro && introContent && !hasSubmitted && (
                <RichText className="mb-8 text-center text-white" data={introContent} enableGutter={false} />
              )}
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 lg:p-8 text-white">
                {formContent}
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    )
  }

  return (
    <div
      className="cms-bg w-full"
      style={backgroundColor ? { '--cms-bg': backgroundColor } as React.CSSProperties : undefined}
    >
      <div className="container py-16 md:py-20 lg:py-24">
        {isSideImage ? (
          // ── Side-image layout ──────────────────────────────────────────────
          <div className="flex flex-col gap-10 md:flex-row md:items-center lg:gap-16">
            {imagePosition !== 'right' && (
              <AnimateIn variant="fade-right" className="w-full shrink-0 md:w-[45%] md:sticky md:top-24">
                <Media resource={image} imgClassName="w-full rounded-2xl object-cover shadow-lg" />
              </AnimateIn>
            )}

            <AnimateIn variant="fade-left" delay={150} className="flex-1 min-w-0">
              {enableIntro && introContent && !hasSubmitted && (
                <RichText className="mb-8" data={introContent} enableGutter={false} />
              )}
              <div className="rounded-2xl border border-border bg-card p-6 lg:p-8">
                {formContent}
              </div>
            </AnimateIn>

            {imagePosition === 'right' && (
              <AnimateIn variant="fade-left" delay={150} className="w-full shrink-0 md:w-[45%] md:sticky md:top-24">
                <Media resource={image} imgClassName="w-full rounded-2xl object-cover shadow-lg" />
              </AnimateIn>
            )}
          </div>
        ) : (
          // ── Centred layout (no image) ──────────────────────────────────────
          <AnimateIn variant="fade-up" className="mx-auto max-w-xl">
            {enableIntro && introContent && !hasSubmitted && (
              <RichText className="mb-8 text-center" data={introContent} enableGutter={false} />
            )}
            <div className="rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm">
              {formContent}
            </div>
          </AnimateIn>
        )}
      </div>
    </div>
  )
}
