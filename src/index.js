import React, { Component } from 'react'
import PropTypes from 'prop-types'

import css from './styles.css'

export default class MiniRichText extends Component {
  static propTypes = {
    style: PropTypes.object,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string
  }

  state = {
    value: null,
    isAddLink: 'none',
    link: '',
    linkText: ''
  };

  handleChange = e => {
    console.log('e =>', e)
  }

  handleAddLink = () => {
    this.setState({ isAddLink: 'block' })
  }

  handleCancleLink = () => {
    this.setState({ isAddLink: 'none' })
  }

  handleConfirmLink = () => {
    const { link, linkText } = this.state

    console.log(link, ' & ', linkText)
    this.setState({ isAddLink: 'none' })
  }

  handleInputChange = (type, e) => {
    // TODO:判空逻辑
    this.setState({ [type]: e.target.value })
  }

  render() {
    const { defaultValue, style } = this.props
    const { isAddLink } = this.state

    return (
      <div className={css['mini-editor-container']} style={style}>
        <div className={css['editor-toolbar']}>
          <button onClick={this.handleAddLink}>插入链接</button>
        </div>

        <div
          className={css['editor-textarea']}
          suppressContentEditableWarning="true"
          contentEditable="true"
          onChange={this.handleChange}
          style={{ height: style && style.height }}
        >
          {defaultValue}
        </div>

        <div className={css['modal-form']} style={{ display: isAddLink }}>
          <div>链接地址：<input onChange={e => this.handleInputChange('link', e)} /></div>
          <div>链接文本：<input onChange={e => this.handleInputChange('linkText', e)} /></div>
          <button onClick={this.handleConfirmLink}>确认</button>
          <button onClick={this.handleCancleLink}>取消</button>
        </div>
      </div>
    )
  }
}
