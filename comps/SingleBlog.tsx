import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Comment from './comment'

function SingleBlog({ token }: { token: string | null }) {
  const [data, setData] = useState<Data | null>(null)
  const [isLoading, setLoading] = useState(true)
  const [comment, setComment] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [error, setError] = useState<null | string>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    let ignore = false
    async function fetchData() {
      try {
        const url = await fetch(`http://localhost:3000/${id}`)
        const data = await url.json()
        if (!ignore) {
          setData(data)
          setFormData(data)
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [comment])

  async function deleteBlog() {
    try {
      const data = await fetch(`http://localhost:3000/${id}/deleteblog`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (data.ok) {
        navigate('/')
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function updateBlog(ids: string) {
    try {
      await fetch(`http://localhost:3000/${ids}/updateBlog`, {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      setIsEditing(false)
    } catch (err) {
      console.log(err)
      setIsEditing(false)
      setError('Error Occurred')
    }
  }

  async function deleteComment(ids: string) {
    try {
      const data = await fetch(`http://localhost:3000/comments/${ids}/delete`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      if (data.ok) {
        setComment(() => !comment)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AllComments = (data: Data) => {
    return (
      <div className='comments-Container'>
        {data.comments.map((comm) => (
          <ul key={uuidv4()} className='comments'>
            <li className='user'>{comm.username}</li>
            <button onClick={(e) => deleteComment(comm._id)} className='X'>
              {'\u274C'}
            </button>
            <li className='content'>{comm.content}</li>
            <li className='time'>
              {new Date(comm.createdAt).toLocaleDateString('en-gb', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })}
            </li>
          </ul>
        ))}
      </div>
    )
  }

  return isLoading ? (
    <h1 className='loading'>Loading...</h1>
  ) : data && !isEditing ? (
    <div className='center singleblog'>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>
        {new Date(data.createdAt).toLocaleDateString('en-gb', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })}
      </p>
      <div className='buttons'>
        <button onClick={deleteBlog} className='delete'>
          Delete
        </button>
        <button onClick={(e) => setIsEditing(!isEditing)}>Edit</button>
      </div>

      <p>Comments</p>
      <AllComments {...data} />
      <Comment id={data._id} setComment={setComment} comment={comment} />
    </div>
  ) : (
    <form
      className='createForm'
      onSubmit={() => {
        if (typeof id === 'string') {
          updateBlog(id)
        }
      }}
    >
      <label htmlFor='title'>Title</label>
      <input type='text' value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      <label htmlFor='content'>Content</label>
      <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
      <div className='buttons'>
        <button type='submit'>Save</button>
        <button type='button' onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </form>
  )
}

interface Data {
  _id: string
  title: string
  content: string
  createdAt: Date
  comments: Array<{ _id: string; username: string; content: string; createdAt: Date }>
}

export default SingleBlog
