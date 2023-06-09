'use client'

import { Prompt } from '@models/prompt'
import { User } from '@models/user'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { MouseEventHandler, useEffect, useState } from 'react'

type props = {
  post: Prompt
  handleTagClick?: (tag: string) => void
  handleEdit?: MouseEventHandler<HTMLParagraphElement>
  handleDelete?: MouseEventHandler<HTMLParagraphElement>
}

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }: props) {
  const { data: session } = useSession()
  const pathName = usePathname()
  const creator = JSON.parse(JSON.stringify(post.creator)) as User
  const [copied, setCopied] = useState('')

  const handleCopy: MouseEventHandler<HTMLDivElement> = (e) => {
    try {
      setCopied(post.prompt)
      navigator.clipboard.writeText(post.prompt)
      setTimeout(() => {
        setCopied('')
      }, 5000)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='prompt_card my-4'>
      <div className='flex justify-between items-start gap-5'>
        {creator._id !== session?.user.id ? (
          <Link
            href={`/profile?id=${creator._id}`}
            className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          >
            <Image
              src={creator.image}
              alt='prompt'
              width={40}
              height={40}
              className='rounded-full'
            />
            <div className='flex-flex-col'>
              <h3 className='font-shatoshi font-semibold text-gray-900'>
                {creator.username}
              </h3>
              <p className='font-inter text-sm'>{creator.email}</p>
            </div>
          </Link>
        ) : (
          <div></div>
        )}
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={20}
            height={20}
            alt='copy'
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => {
          handleTagClick && handleTagClick(post.tag)
        }}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-2 flex flex-center gap-4 border-gray-100 pt-2'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer mr-1'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
