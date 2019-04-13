import React, {Component} from 'react'
import PropTypes from "prop-types";
import FormView from './FormView'
import Operation from './Operation'
import List from './List'
import utils from '../utils'
import './style.css'

// default
const defaultPagination = {
  pageNo: 1,
  pageSize: 20,
  total: 0,
}

class Admin extends Component {

  params = {}

  pagination = defaultPagination

  static defaultProps = {
    config: {},
    history: null,
  }

  static propTypes = {
    config: PropTypes.object,
    history: PropTypes.object,
  }

  constructor(props) {
    super(props)

    const {filterConfig} = props.config

    this.type = 'form'

    if (filterConfig) {
      this.type = 'filter'
    }

    if (props.history) {
      this.getHistory(props.history)
    }

    const {options = {}} = props.config
    if (options.pagination) {
      this.pagination = options.pagination
    }

    this.state = {
      dataSource: [],
      pagination: this.pagination
    }
  }

  componentDidMount() {
    const {history} = this.props
    if (history) {
      this.getHistory(history)
    }
    const {options={}} = this.props.config
    const {MountQuery = true} = options
    if (this.type === 'filter' && MountQuery) {
      this.queryList(this.params)
    }
    // console.log('this.formCore', this.formCore)
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.history && this.props.history) &&
      (nextProps.history.location.search !== this.props.history.location.search
      || nextProps.history.location.pathname !== this.props.history.location.pathname)
    ) {
      this.getHistory(nextProps.history)
    }
    // console.log('admin-_-params', nextProps)
    // this.params = {}
  }

  getHistory = (history) => {
    this.history = history
    this.params = utils.searchToObj(history.location.search)
  }

  saveParams = (data) => {
    this.params = {...this.params, ...this.formCore.getFieldsValue(), ...data}
  }

  refresh = (params, page) => {
    const pager = {
      ...page,
      pageNo: page.page
    }
    this.queryList(params, pager)
  }

  savePagination = (pagination) => {
    const {state} = this
    const lastPagination = {...state.pagination, ...pagination}
    this.setState({
      pagination: lastPagination
    })
  }

  beforeQuery = (params, core) => {
    const result = {...core.formCore.getFieldsValue(), ...params}
    return result
  }

  afterSuccess = (res) => {
    const {state} = this
    const pagination = {...state.pagination, total: res.data.allRow}

    console.log('afterSuccess---------', res)
    this.setState({
      dataSource: res.data.list,
      pagination,
    })
  }

  queryList = (params, pageParams) => {
    console.log('--------params, pageParams', params, pageParams)
    const {props} = this
    const {config} = props
    const {request, afterSuccess = this.afterSuccess, options={}} = config
    const {beforeQuery, afterQuery, paginationKey} = options

    // page
    let page = {
      pageNo: this.pagination.pageNo,
      pageSize: this.pagination.pageSize,
      ...pageParams,
    }

    if (paginationKey) {
      page = {
        [paginationKey[0]]: page.pageNo,
        [paginationKey[1]]: page.pageSize,
      }
    }

    // before
    let fixParams = this.beforeQuery(params, this)
    fixParams = beforeQuery && beforeQuery(fixParams, this)

    // request
    const paramsData = {...fixParams, ...page}
    console.log('paramsData', paramsData)
    const paramsDataClear = utils.objClear(paramsData)
    this.saveParams(paramsDataClear)
    request && request(paramsDataClear)
      .then(res => {
        const fixRes = (afterQuery && afterQuery(res, this)) || res
        console.log('res', fixRes)
        fixRes && afterSuccess(fixRes, this)
      })
  }

  render() {

    this.core = this
    const {props, state} = this
    const {formConfig, filterConfig, operationConfig, listConfig} = props.config

    let children = <div>Admin Missing configuration</div>
    if (formConfig) {
      children =
        <div style={{
          position: 'relative',
          minWidth: 1200,
          background: '#FFFFFF',
        }}
        >
          <FormView
            formConfig={formConfig}
            core={this}
            ref={ref => this.formCore = ref}
            wrappedComponentRef={inst => this.formInst = inst}
            history={this.history}
          />
        </div>
    } else if (filterConfig && operationConfig && listConfig) {
      children =
        <div style={{
          position: 'relative',
          minWidth: 1200,
          background: '#FFFFFF',
        }}
        >
          <FormView
            filterConfig={filterConfig}
            core={this}
            ref={ref => this.formCore = ref}
            wrappedComponentRef={inst => this.formInst = inst}
            history={this.history}
          />
          <Operation
            config={operationConfig}
            core={this}
            ref={ref => this.operationCore = ref}
            history={this.history}
          />
          <List
            config={listConfig}
            dataSource={state.dataSource}
            pagination={state.pagination}
            core={this}
            ref={ref => this.listCore = ref}
            history={this.history}
          />
        </div>
    }

    return children
  }
}

export default Admin