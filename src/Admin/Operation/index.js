import React, {Component} from 'react'
import {
  Row, Col, Button
} from 'antd'
import PropTypes from "prop-types";

class Operation extends Component {

  static defaultProps = {
    core: {},
    config: {
      button: []
    },
  }

  static propTypes = {
    core: PropTypes.object,
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
    const {core, config} = this.props
    const {button, opStyle} = config
    return (
      <div
        style={{
          position: 'absolute',
          zIndex: '10',
          padding: '0 32px',
          marginTop: '-64px',
          ...opStyle
        }}
      >
        <Row>
          <Col span={12} style={{textAlign: 'left'}}>
            {
              button.map((btn, i) => {
                return <Button key={i} type={btn.type} onClick={(e)=>{btn.onClick(e, core)}}>{btn.label}</Button>
              })
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default Operation