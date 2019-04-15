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
    history: undefined,
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
    const {options = {}} = this.props.config
    const {MountQuery = true} = options
    if (this.type === 'filter' && MountQuery) {
      this.queryList(this.params)
    }

    // formCore
    if (this.formInst.props) {
      this.formCore = this.formInst.props.form
    } else {
      console.log('err', this)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.history) {
      this.getHistory(nextProps.history)
    }
  }

  getHistory = (history) => {
    this.history = history
    this.paramsObj = utils.searchToObj(history.location.search)
    this.params = utils.searchToObj(history.location.search)
  }

  saveParams = (data) => {
    this.params = {...this.params, ...this.formCore.getFieldsValue(), ...data}
  }

  refresh = (params, page) => {
    this.queryList(params, page)
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
    const pagination = {...state.pagination, total: res.data.total || res.data.allRow}
    this.setState({
      dataSource: res.data.list,
      pagination,
    })
  }

  queryList = (params, pageParams) => {
    const {props} = this
    const {config} = props
    const {request, afterSuccess = this.afterSuccess, options = {}} = config
    const {beforeQuery, afterQuery, paginationKey} = options

    // page
    let page = {
      pageNo: this.pagination.pageNo,
      pageSize: this.pagination.pageSize,
      ...pageParams,
    }
    if (pageParams) {
      this.savePagination(pageParams)
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
    const paramsDataClear = utils.objClear(paramsData)
    this.saveParams(paramsDataClear)
    request && request(paramsDataClear)
      .then(res => {
        // after
        const fixRes = (afterQuery && afterQuery(res, this)) || res
        fixRes && afterSuccess(fixRes, this)
      })
  }

  resetFilter = () => {
    const {options} = this.props.config
    const {unResetFilterKey} = options

    const values = this.formCore.getFieldsValue()

    this.formCore.resetFields()

    const newValues = {}
    unResetFilterKey.forEach((key) => {
      newValues[key] = values[key]
    })

    this.formCore.setFieldsValue(newValues)

    this.queryList(null, {pageNo: 1})
  }

  render() {

    this.core = this
    const {props, state} = this
    const {formConfig, filterConfig, operationConfig, listConfig} = props.config

    let children = <div>Admin Missing configuration</div>

    let fieldsValues = {}
    if (this.formCore && this.formCore.getFieldsValue) {
      fieldsValues = this.formCore.getFieldsValue()
    }
    // const hash = Math.random().toString().slice(2,8)
    if (formConfig) {
      children =
        <div style={{
          position: 'relative',
          minWidth: 980,
          background: '#FFFFFF',
        }}
        >
          <FormView
            // key={`form${hash}`}
            formConfig={formConfig}
            core={this}
            wrappedComponentRef={inst => this.formInst = inst}
            history={this.history}
            fieldsValues={fieldsValues}
          />
        </div>
    } else if (filterConfig && operationConfig && listConfig) {
      children =
        <div style={{
          position: 'relative',
          minWidth: 980,
          background: '#FFFFFF',
        }}
        >
          <FormView
            // key={`filter${hash}`}
            filterConfig={filterConfig}
            core={this}
            wrappedComponentRef={inst => this.formInst = inst}
            history={this.history}
            fieldsValues={fieldsValues}
          />
          <Operation
            // key={`opera${hash}`}
            config={operationConfig}
            core={this}
            ref={ref => this.operationCore = ref}
            history={this.history}
          />
          <List
            // key={`list${hash}`}
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