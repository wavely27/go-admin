import React, {Component} from 'react'
import PropTypes from "prop-types";
import Filter from './Filter'
import Operation from './Operation'
import List from './List'

class Admin extends Component {

  static defaultProps = {
    config: {}
  }

  static propTypes = {
    config: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    const {props} = this
    const {filterConfig, operationConfig, listConfig} = props.config

    return (
      <div>
        <Filter config={filterConfig} />
        <Operation config={operationConfig} />
        <List config={listConfig} />
      </div>
    )
  }
}

export default Admin