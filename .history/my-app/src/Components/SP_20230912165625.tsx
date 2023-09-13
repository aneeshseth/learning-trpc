import React, {useState} from 'react'

function SP() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  return (
    <div>
        <input value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input value={password} onChange={(e) => setPassword(e.target.value)}/>
    </div>
  )
}

export default SP