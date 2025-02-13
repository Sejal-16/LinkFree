import './Home.css'

import React, { useState, useEffect } from 'react'
import { ProgressBar } from 'primereact/progressbar'
import { Avatar } from 'primereact/avatar'
import { Tooltip } from 'primereact/tooltip'

function Home() {
  const [showProgress, setShowProgress] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    fetch('/list.json')
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch((error) => {
        console.log('Home useEffect', error)
        alert('An error occurred please try again later.')
      })
      .finally(() => setShowProgress(false))
  }, [])

  return (
    <main>
      {showProgress && <ProgressBar mode="indeterminate" />}
      {list.map((user, key) => (
        <a href={`${user.username}`} key={`avatar-${key}`}>
          <div className = "avatar-div " data-pr-tooltip={user.username} data-pr-position="bottom">
            <Avatar
              image={user.avatar}
              shape="circle"
              size="xlarge"
              className="p-m-2"
              imageAlt={user.username}
            />
          </div>
          <Tooltip target=".avatar-div" className="p-tooltip usernameTooltip" />
        </a>
      ))}
    </main>
  )
}

export default Home
