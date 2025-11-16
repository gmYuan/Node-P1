import { NextPage } from "next";
import axios from "axios";
import {useEffect, useState} from "react";

type TPost = {
  id: number
  title: string
  date: string
}

const PostsIndex: NextPage = () => {
  const [posts, setPosts] = useState<TPost[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    setIsLoading(true)
    axios.get('/api/v1/posts').then(res => {
      console.log(res.data)
      setPosts(res.data)
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }).catch(err => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Posts Index</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title} - {post.date}</li>
        ))}
      </ul>
    </div>
  )
}

export default PostsIndex