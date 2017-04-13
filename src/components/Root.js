import React from 'react'
import axios from 'axios'
import CreateRequestForm from './CreateRequestForm'
import Response from './Response'
import Request from './Request'

class Root extends React.Component {
  constructor() {
    super()

    this.state = {
      requests: [],
      testPassed: null,
      errorMessage: ''
    }

    this.createRequest = this.createRequest.bind(this)
    this.testRequest = this.testRequest.bind(this)
    this.handleUrlChange = this.handleUrlChange.bind(this)
  }

  createRequest(params) {
    this.setState({ requests: [params].concat(this.state.requests) })
  }

  testRequest(params) {
    axios({
      method: params.method,
      url: params.url,
      headers: params.headers,
    }).then(response => {
      this.setState({
        testPassed: 'p',
        errorMessage: ''
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        testPassed: 'f',
        errorMessage: error.toString()
      })
    })
  }

  handleUrlChange() {
    this.setState({
      testPassed: null,
      errorMessage: ''
    })
  }

  render() {
    return (
      <div className="container">
        <h2>API Explorer</h2>
        <hr/>
        <CreateRequestForm
          createRequest={this.createRequest}
          testRequest={this.testRequest}
          testPassed={this.state.testPassed}
          onUrlChange={this.handleUrlChange}
        />

        {this.state.response &&
          <Response response={this.state.response} />
        }

        {this.state.errorMessage &&
          <div className="alert alert-danger">{this.state.errorMessage}</div>  
        }

        <hr/>

        <h4>Requests</h4>
        {this.state.requests.map((request, index) => {
          return <Request key={request.timestamp} request={request} />
        })}
      </div>
    )
  }
}

export default Root