import React from 'react'

class Form extends React.Component {
  constructor() {
    super()

    this.state = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    this.addHeader = this.addHeader.bind(this)
  }

  addHeader(key, value) {
    let newHeaders = this.state.headers
    newHeaders[key] = value
    this.setState({ headers: newHeaders })
  }

  removeHeader(key) {
    let newHeaders = this.state.headers
    delete newHeaders[key]
    this.setState({ headers: newHeaders})
  }

  handleClick(url, method, body) {
    if (!url) { return }

    let params = {
      url: url,
      method: method,
      headers: this.state.headers,
      body: body
    }
    this.props.makeRequest(params)
  }

  render() {
    let endpointUrl, httpMethod, headerKey, headerValue, body

    return (
      <div>
        <div className="row">
          <div className="col-md-10">
            <input
              className="form-control"
              type="text"
              placeholder="https://www.yoursite.com/api"
              ref={ref => endpointUrl = ref}
            />
          </div>
          <div className="col-md-2">
            <select className="form-control" ref={ref => httpMethod = ref}>
              <option value="get">GET</option>
              <option value="post">POST</option>
              <option value="put">PUT</option>
              <option value="delete">DELETE</option>
            </select>
          </div>
        </div>

        <h5>Headers</h5>
        <div className="request-headers">
          {Object.keys(this.state.headers).map(key => {
            return (
              <div key={key}>
                {key}: {this.state.headers[key]}
                {key !== 'Content-Type' &&
                  <a onClick={() => this.removeHeader(key)}>Remove</a>
                }
              </div>
            )
          })}
        </div>

        <div className="row">
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              placeholder="key"
              ref={ref => headerKey = ref}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              type="text"
              placeholder="value"
              ref={ref => headerValue = ref}
            />
          </div>
          <div className="col-md-1">
            <button
              className="btn btn-primary"
              onClick={() => this.addHeader(headerKey.value, headerValue.value)}
            >
              Add
            </button>
          </div>
        </div>

        <h5>Body</h5>
        <div className="row">
          <div className="col-md-12">
            <textarea
              className="form-control"
              placeholder={'[{name: "email"}, {name: "full-name"}, {name: "phone"}]'}
              ref={ref => body = ref}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-success go-btn"
              onClick={() => this.handleClick(endpointUrl.value, httpMethod.value, body.value)}
            >
              Go!
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Form