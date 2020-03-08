import React, { Component } from 'react'
import PropTypes from 'prop-types'

import css from './styles.css'

export default class MiniRichText extends Component {
  static propTypes = {
    style: PropTypes.object,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
  }

  state = {
    isAddLink: 'none',
    link: '',
    linkText: ''
  };

  handleInput = e => {
    // this.setState({
    //   value: e.target.innerHTML
    // })

    this.props.onChange(e.target.innerHTML)
  }

  handleAddLink = () => {
    this.saveCurrentRange()

    this.setState({
      isAddLink: 'block'
    })
  }

  handleCancleLink = () => {
    this.setState({ isAddLink: 'none' })
  }

  handleConfirmLink = () => {
    const { link } = this.state

    // const linkStr = `<a href="${link}">${linkText}</a>`
    // this.setState({
    //   isAddLink: 'none',
    //   value: value + linkStr
    // })
    // const a = document.getElementById('editor');
    // a.innerHTML = value + linkStr;

    const selection = window.getSelection ? window.getSelection() : document.getSelection()
    selection.removeAllRanges()
    // 从this.range中获得保存的Range设置为Selection的Range对象
    selection.addRange(this.range)

    document.execCommand('createLink', false, link)
    this.setState({ isAddLink: 'none' })
  }

  handleInputChange = (type, e) => {
    // TODO:判空逻辑
    this.setState({ [type]: e.target.value })
  }

  saveCurrentRange () {
    // 获取selection对象
    const selection = window.getSelection ? window.getSelection() : document.getSelection()
    if (!selection.rangeCount) {
      return
    }
    // const content = this.$refs.content
    for (let i = 0; i < selection.rangeCount; i++) {
      // 从selection中获取第一个Range对象
      const range = selection.getRangeAt(0)
      this.range = range
    }
  }

  render() {
    const { style } = this.props
    const { isAddLink } = this.state

    const maskStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      background: 'rgba(245, 245, 245, 0.75)'
    }

    return (
      <div className={css['mini-editor-container']} style={style}>
        <div className={css['editor-toolbar']}>
          <button onClick={this.handleAddLink}>Add Link</button>
        </div>

        <div
          id="editor"
          className={css['editor-textarea']}
          style={{ height: style && style.height }}
          suppressContentEditableWarning="true"
          contentEditable="true"
          onInput={this.handleInput}
          dangerouslySetInnerHTML={{ __html: this.props.defaultValue }}
        >
        </div>

        <div style={{ display: isAddLink, ...maskStyle }}></div>
        <div className={css['modal-form']} style={{ display: isAddLink }}>
          <div><label>URL:</label> <input onChange={e => this.handleInputChange('link', e)} /></div>
          {/* <div><label>TEXT:</label><input onChange={e => this.handleInputChange('linkText', e)} /></div> */}
          <p style={{ marginTop: '20px', backgroundColor: '#fafafa', padding: '10px' }}>
            <button onClick={this.handleConfirmLink}>OK</button>
            <button onClick={this.handleCancleLink}>Cancel</button>
          </p>
        </div>
      </div>
    )
  }
}
