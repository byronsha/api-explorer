import React from 'react'
import axios from 'axios'
import Response from './Response'

class Request extends React.Component {
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

  createMarkup() {
    let inputs = eval(JSON.parse(this.props.request.body))
    let htmlString = ''
    
    for (let i = 0; i < inputs.length; i++) {
      let current = inputs[i]
      let element = `<input`
      for (let key in current) {
        element += ` ${key}="${current[key]}"`
      }
      element += ` placeholder="${current.name}" class="form-control" /><br/>`
      htmlString += element
    }

    return {__html: htmlString}
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

        <h5>Parameters</h5>
        <div className="parameters" dangerouslySetInnerHTML={this.createMarkup()} />

        {this.state.response &&
          <Response response={this.state.response} />
        }
      </div>
    )
  }
}

export default Request