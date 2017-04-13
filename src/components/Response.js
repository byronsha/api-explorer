import React from 'react'

const Response = ({ response }) => {
  if (Array.isArray(response)) {
    return (
      <div className="alert alert-success">
        {response.map(item => {
          return Object.keys(item).map(key => {
            return <div key={key + item}><b>{key}</b>: {item[key]}</div>
          })
        })}
      </div>
    )
  } else {
    return (
      <div className="alert alert-success">
        {Object.keys(response).map(key => {
          return <div key={key}><b>{key}</b>: {response[key]}</div>
        })}
      </div>
    )
  }
}

export default Response