'use client'

import PromptCard from '@components/PromptCard'
import { Prompt } from '@models/prompt'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

function Feed() {
  const [searchText, setSearchText] = useState('')
  const [searchValue] = useDebounce(searchText, 700)
  const [onlyTag, setOnlyTag] = useState(false)
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [searchedPrompts, setSearchedPrompts] = useState<Prompt[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch('/api/prompts')
      const data = (await response.json()) as Prompt[]
      setPrompts(data)
      setSearchedPrompts(data)
    })()
  }, [])

  useEffect(() => {
    // Filter
    setSearchedPrompts(() =>
      prompts.filter((prompt) => {
        if (onlyTag) {
          return prompt.tag.includes(searchValue)
        } else {
          return (
            prompt.creator.username.includes(searchValue) ||
            prompt.prompt.includes(searchValue) ||
            prompt.tag.includes(searchValue)
          )
        }
      }),
    )
  }, [searchValue])

  const handleTagClick = (prompt: Prompt) => {
    setSearchText(prompt.tag)
  }

  return (
    <section className='feed'>
      <form action='' className='w-full flex-center relative'>
        <input
          className='search_input peer'
          placeholder='Search for a tag or a username'
          required
          type='text'
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />
      </form>
      <div>
        {searchedPrompts.map((prompt) => (
          <PromptCard
            key={prompt._id}
            post={prompt}
            handleTagClick={() => {
              handleTagClick(prompt)
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default Feed
