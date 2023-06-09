import PromptCard from '@components/PromptCard/PromptCard'
import { Prompt } from '@models/prompt'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { MouseEventHandler } from 'react'

type props = {
  name: string
  desc: string
  data: Prompt[]
  handleEdit: (post: Prompt) => void
  handleDelete: (post: Prompt) => void
}

function Profile({ name, desc, data, handleDelete, handleEdit }: props) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name}</span> Profile
      </h1>
      <p className='desc text-left'>{desc}</p>
      <div className='mt-10 prompt_layout'>
        {data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            post={prompt}
            handleEdit={() => {
              handleEdit(prompt)
            }}
            handleDelete={() => {
              handleDelete(prompt)
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile
