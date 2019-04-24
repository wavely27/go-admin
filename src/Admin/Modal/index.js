import React, {Component} from 'react'
import {Modal} from 'antd'
import PropTypes from "prop-types";

class editModal extends Component {

  static defaultProps = {
    config: {},
    visible: false,
  }

  static propTypes = {
    config: PropTypes.object,
    visible: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    const {visible} = this.props
    this.setState({
      visible
    })
  }

  handleOk = (e) => {
    e.preventDefault()
    const {handleOk} = this.props.config
    handleOk && handleOk()
    this.setState({
      visible: false
    })
  }

  handleCancel = (e) => {
    e.preventDefault()
    this.setState({
      visible: false
    })
  }

  render() {
    const {props, state} = this /* eslint-disable-line */
    // const {modalConfig} = props
    const {visible} = state

    const config = {
      title: '模态框'
    }

    const {title} = config
    return (
      <Modal
        title={title}
        visible={visible}
        destroyOnClose
        {...config}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
  }
}

export default editModal