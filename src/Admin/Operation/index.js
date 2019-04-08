import React, {Component} from 'react'
import {
  Row, Col, Button
} from 'antd'
import PropTypes from "prop-types";

class Operation extends Component {

  static defaultProps = {
    config: {
      button: []
    }
  }

  static propTypes = {
    config: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleAdd = () => {
    const {expand} = this.state;
    this.setState({expand: !expand});
  }

  render() {
    const {props} = this
    const {config} = props
    console.log('config', config)
    return (
      <div
        style={{
          padding: '24px',
          background: '#fbfbfb',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
        }}
      >
        {/*
          <Row gutter={24}>{this.getFields()}</Row>
        */}
        <Row>
          <Col span={24} style={{textAlign: 'left'}}>
            <Button type="primary">添加</Button>
            <Button style={{marginLeft: 8}} type="primary" htmlType="submit">跳转</Button>
            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
              批量删除
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Operation