import React from 'react'
import useAuth from '../hooks/useAuth'

export default function Home() {
  const {isAuthenticated} = useAuth()
  return (
    <>
      { isAuthenticated ? <>Go to My Projects</> : <>The Kanban Board</> }
    </>
  )
}