'use client'

import Form from '@components/Form/Form'
import { emptyPrompt } from '@interfaces/empty'
import { Prompt } from '@models/prompt'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEventHandler, useEffect, useState } from 'react'

function UpdatePrompt() {
  const { data: session } = useSession()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState<Prompt>(emptyPrompt)
  const router = useRouter()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')

  const updatePrompt: FormEventHandler = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      const response = await fetch(`/api/prompts/${post._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user}`,
          // or if using cookies for session management
          // Cookie: `sessionToken=${session?.accessToken}`,
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        router.push('/profile')
      }
    } catch (e) {
      console.log(e)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    try {
      if (promptId) {
        ;(async () => {
          const response = await fetch(`/api/prompts/${promptId}`, {
            method: 'GET',
          })
          const data = (await response.json()) as Prompt
          setPost(data)
        })()
      }
    } catch (e) {
      console.log(e)
    }
  }, [promptId])

  return (
    <Form
      type='Update'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt
