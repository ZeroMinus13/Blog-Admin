import React, { useState } from 'react'

type commentProps = {
  id: string
  setComment: React.Dispatch<React.SetStateAction<boolean>>
  comment: boolean
}

function Comment({ id, setComment, comment }: commentProps) {
  const [formData, setFormData] = useState({ username: '', content: '' })
  const [error, setError] = useState<null | string>(null)

  async function submitData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const response = await fetch(`http://localhost:3000/comments/${id}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: formData.username, content: formData.content, _id: id }),
      })
      if (response.ok) {
        setFormData({ username: '', content: '' })
        setComment(() => !comment)
      } else {
        const errorResponse = await response.json()
        console.log(errorResponse)
        setError(errorResponse.error)
      }
    } catch (err) {
      console.log(err)
      setError('Error Occurred')
    }
  }

  return (
    <>
      <form method='POST' onSubmit={submitData} className='commentForm'>
        <span className='error'>{error}</span>
        <label htmlFor='username'>Username*</label>
        <input
          type='text'
          name='username'
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          value={formData.username}
          placeholder='Username'
        />

        <label htmlFor='content'>Comment*</label>
        <textarea
          name='content'
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          value={formData.content}
          placeholder='Comment'
        />
        <br />
        <button>Send</button>
      </form>
    </>
  )
}
export default Comment
