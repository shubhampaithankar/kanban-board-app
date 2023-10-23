import React from 'react'

export default function Home() {
  const isAuthenticated = false
  return (
    <>
      { isAuthenticated ? <>Go to My Projects</> : <>The Kanban Board</> }
    </>
  )
}