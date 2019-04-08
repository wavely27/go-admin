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
    const {columns, data} = config
    console.log('config', config)
    return (
      <Table columns={columns} dataSource={data} />
    )
  }
}

export default List
