import React from 'react'

function Error404({message}) {
  return (
    <div style={{display: "flex",
        justifyContent: "center"}}><h3>{message}</h3></div>
  )
}

export default Error404