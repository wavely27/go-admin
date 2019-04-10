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
    this.state = {
      dataSource: []
    }
  }

  componentDidMount() {
    const {props, state} = this
    const {params} = state
    const {config} = props
    const {request} = config
    if (0) {
      request && request(params)
        .then(res => {
          console.log('res', res)
        })
    }
  }

  afterSuccess = (res) => {
    console.log('dataSource', res,)
    this.setState({
      dataSource: res.data.list
    })
  }

  qeuryList = (params) => {
    const {props} = this
    const {config} = props
    const {request, afterSuccess=this.afterSuccess} = config

    request && request(params)
      .then(res => {
        console.log('res', res)
        res && afterSuccess(res)
      })
  }

  render() {

    this.core = this
    const {props ,state} = this
    const {formConfig, filterConfig, operationConfig, listConfig} = props.config

    let children = <div>Admin Missing configuration</div>
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
          <List config={listConfig} dataSource={state.dataSource} />
        </div>
    }

    return children
  }
}

export default Admin