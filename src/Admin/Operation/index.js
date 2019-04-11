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
    const {config} = this.props
    const {button, opStyle} = config
    return (
      <div
        style={{
          position: 'absolute',
          zIndex: '10',
          padding: '0 32px',
          background: '#fbfbfb',
          marginTop: '-64px',
          ...opStyle
        }}
      >
        {/*
          <Row gutter={24}>{this.getFields()}</Row>
        */}
        <Row>
          <Col span={12} style={{textAlign: 'left'}}>
            {
              button.map(btn => {
                return <Button type={btn.type}>{btn.label}</Button>
              })
            }
            {/*
            <Button style={{marginLeft: 8}} type="primary" htmlType="submit">跳转</Button>
            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
              批量删除
            </Button>
            */}
          </Col>
        </Row>
      </div>
    )
  }
}

export default Operation