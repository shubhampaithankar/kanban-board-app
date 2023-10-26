import React from 'react'
import useAuth from '../hooks/useAuth'

export default function Home() {
  const auth = useAuth()
  return (
    <>
      { auth?.isAuthenticated ? <>Go to My Projects</> : <>The Kanban Board</> }
    </>
  )
}