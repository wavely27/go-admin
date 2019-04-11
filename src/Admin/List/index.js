import React, {Component} from 'react'
import {
  Table
} from 'antd'
import PropTypes from "prop-types";

class List extends Component {

  static defaultProps = {
    config: {
      columns: [],
      data: [],
    },
    dataSource: []
  }

  static propTypes = {
    config: PropTypes.object,
    dataSource: PropTypes.array,
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
    const {config, dataSource} = props
    const {options, columns} = config
    return (
      <Table
        style={{
          padding: '0 32px 24px',
          background: '#fbfbfb',
        }}
        {...options}
        columns={columns}
        dataSource={dataSource}
      />
    )
  }
}

export default List
