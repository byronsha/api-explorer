import React from 'react'
import axios from 'axios'
import Form from './Form'
import Response from './Response'
import PastRequest from './PastRequest'

class Root extends React.Component {
  constructor() {
    super()

    this.state = {
      response: null,
      pastRequests: [],
      errorMessage: null
    }

    this.makeRequest = this.makeRequest.bind(this)
  }

  makeRequest(params) {
    axios({
      method: params.method,
      url: params.url,
      headers: params.headers,
      data: params.body
    }).then(response => {
      this.setState({
        response: response.data,
        pastRequests: this.state.pastRequests.concat([params]),
        errorMessage: null
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        response: null,
        errorMessage: error.toString()
      })
    })
  }

  render() {
    return (
      <div className="container">
        <h2>API Explorer</h2>
        <hr/>
        <Form makeRequest={this.makeRequest} />

        {this.state.response &&
          <Response response={this.state.response} />
        }

        {this.state.errorMessage &&
          <div className="alert alert-danger">{this.state.errorMessage}</div>  
        }

        <hr/>

        <h4>Past requests</h4>
        {this.state.pastRequests.map((request, index) => {
          return <PastRequest key={index} request={request} />
        })}
      </div>
    )
  }
}

export default Root