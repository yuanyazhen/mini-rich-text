import React, { Component } from 'react'

import ExampleComponent from 'mini-rich-text'

export default class App extends Component {
  state = {
    value: ''
  }

  onChange = param => {
    this.setState({
      value: param
    })
  }

  render () {
    return (
      <div>
        <ExampleComponent
          text='Modern React component module'
          onChange={this.onChange}
        />
        <p>
          结果是：{this.state.value}
        </p>
      </div>
    )
  }
}
