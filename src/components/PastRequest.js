import React from 'react'
import axios from 'axios'
import Response from './Response'

class PastRequest extends React.Component {
  constructor() {
    super()

    this.state = {
      response: null
    }
  }

  makeRequest() {
    const { request } = this.props

    axios({
      method: request.method,
      url: request.url,
      headers: request.headers
    }).then(response => {
      this.setState({ response: response.data })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    const { request } = this.props

    return (
      <div>
        <hr/>
        <button
          className="btn btn-success btn-xs"
          onClick={() => this.makeRequest()}>{request.method.toUpperCase()}
        </button> - {request.url}
        
        <h5>Headers</h5>
        <div className="request-headers">
          {Object.keys(request.headers).map(key => {
            return <div key={key}>{key}: {request.headers[key]}</div>
          })}
        </div>

        <h5>Body</h5>
        <div className="request-body">{request.body}</div>

        {this.state.response &&
          <Response response={this.state.response} />
        }
      </div>
    )
  }
}

export default PastRequest