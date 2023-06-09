import { Prompt } from '@models/prompt'
import Link from 'next/link'
import { FormEventHandler } from 'react'

type props = {
  type: string
  post: Prompt
  setPost: React.Dispatch<React.SetStateAction<Prompt>>
  submitting: boolean
  handleSubmit: FormEventHandler
}

function Form({ type, post, setPost, submitting, handleSubmit }: props) {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc flex-start'>
        {type} and share amazing prompts with the world, and let you imagination
        run wild with any AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        action=''
      >
        <label htmlFor=''>
          <span className='font-satoshi font-semibold text-gray-700'>
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value })
            }}
            placeholder='Write you prompt here...'
            required
            className='form_textarea'
          ></textarea>
        </label>
        <label htmlFor=''>
          <span className='font-satoshi font-semibold text-gray-700'>
            Tag{' '}
            <span className='font-normal text-sm'>
              {' '}
              (#product, #study, #english, ...)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value })
            }}
            placeholder='#tag'
            required
            className='form_input'
          ></input>
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form