import React from 'react'

const Response = ({ response }) => (
  <div className="alert alert-success">
    {Object.keys(response).map(key => {
      return <div key={key}><b>{key}</b>: {response[key]}</div>
    })}
  </div>
)

export default Response