import React, {Component} from 'react'
import PropTypes from "prop-types";
import FormView from './FormView'
import Operation from './Operation'
import List from './List'
// import config from "../listConfig";
// import config from "../formConfig";
import history from '../utils/history'
import utils from '../utils'
import './style.css'

class Admin extends Component {

  params = {}

  static defaultProps = {
    config: {},
  }

  static propTypes = {
    config: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
    }
    console.log('Admin____props', props, history, history.location.search)
    this.params = utils.searchToObj(history.location.search)
  }

  componentDidMount() {
    this.qeuryList(this.params)
  }

  componentWillReceiveProps() {
    // console.log('admin-_-params', nextProps)
    // this.params = {}
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

    console.log('request', request)

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
        <div style={{
          position: 'relative',
          minWidth: 1024,
          background: '#FFFFFF',
        }}
        >
          <FormView formConfig={formConfig} core={this} />
        </div>
    } else if (filterConfig && operationConfig && listConfig) {
      children =
        <div style={{
          position: 'relative',
          minWidth: 1024,
          background: '#FFFFFF',
        }}
        >
          <FormView filterConfig={filterConfig} core={this} />
          <Operation config={operationConfig} core={this} />
          <List config={listConfig} dataSource={state.dataSource} core={this} />
        </div>
    }

    return children
  }
}

export default Admin