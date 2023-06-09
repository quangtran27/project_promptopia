'use client'

import Profile from '@components/Profile'
import { emptyUser } from '@interfaces/empty'
import { Prompt } from '@models/prompt'
import { User } from '@models/user'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ErrorPage from 'next/error'

function MyProfile() {
  const { data: session } = useSession()
  const [posts, setPosts] = useState<Prompt[]>([])
  const params = useSearchParams()
  const router = useRouter()
  const [user, setUser] = useState<User>(emptyUser)

  const handleEdit = (post: Prompt) => {
    router.push(`/prompt/update?id=${post._id}`)
  }

  const handleDelete = async (post: Prompt) => {
    if (!post._id) {
      alert('Prompt ID not found')
      return
    }

    const hasConfirmed = confirm('Are you sure to delete this prompt?')
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompts/${post._id}`, {
          method: 'DELETE',
        })
        setPosts((prev) => prev.filter((p) => p._id !== post._id))
      } catch (e) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    const userId = params.get('id')
    if (userId) {
      const getUser = async () => {
        const response = await fetch(`/api/users/${userId}`)
        const data = (await response.json()) as User
        if (data !== null) {
          setUser(data)
        }
      }
      const getPost = async () => {
        const response = await fetch(`/api/users/${userId}/posts`)
        const data = (await response.json()) as Prompt[]
        setPosts(data)
      }

      getUser()
      getPost()
    }
  }, [params])

  return (
    <>
      {user.username ? (
        <Profile
          name={user._id === session?.user.id ? 'My' : `${user.username}'s`}
          desc={`Welcome to ${
            user._id === session?.user.id ? 'your' : `${user.username}'s`
          } personalized profile page`}
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ) : (
        <ErrorPage statusCode={404} />
      )}
    </>
  )
}

export default MyProfile
