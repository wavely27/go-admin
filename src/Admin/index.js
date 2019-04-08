import React, {Component} from 'react'
import PropTypes from "prop-types";
import FormView from './FormView'
import Operation from './Operation'
import List from './List'
// import config from "../listConfig";
// import config from "../formConfig";

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

  render() {
    const {props} = this
    const {formConfig, filterConfig, operationConfig, listConfig} = props.config

    let children = <div>Missing configuration</div>
    if (formConfig) {
      children =
        <div style={{minWidth: 960}}>
          <FormView formConfig={formConfig} />
        </div>
    } else if (filterConfig && operationConfig && listConfig) {
      children =
        <div style={{minWidth: 960}}>
          <FormView filterConfig={filterConfig} />
          <Operation config={operationConfig} />
          <List config={listConfig} />
        </div>
    }

    return children
  }
}

export default Admin