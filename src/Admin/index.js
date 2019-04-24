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

    // formCore
    if (this.formInst.props) {
      this.formCore = this.formInst.props.form
    } else {
      console.log('err', this)
    }

    const {options = {}} = this.props.config
    const {MountQuery = true} = options
    if (this.type === 'filter' && MountQuery) {
      this.queryList(this.params)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.history) {
      this.getHistory(nextProps.history)
    }
  }

  getHistory = (history = {}) => {
    this.history = history
    const {location = {}} = this.history
    const {search = ''} = location
    this.paramsObj = utils.searchToObj(search)
    this.params = utils.searchToObj(search)
  }

  saveParams = (data) => {
    let values = {}
    if (this.formCore) {
      values = this.formCore.getFieldsValue && this.formCore.getFieldsValue()
    }
    this.params = {...this.params, ...values, ...data}
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
    let result = {...params}
    if (core.formCore) {
      const values = core.formCore.getFieldsValue && core.formCore.getFieldsValue()
      result = {...values, ...params}
    }
    return result
  }

  afterSuccess = (res, core, changeAfter) => {
    const {state} = core
    const pagination = {...state.pagination, total: res && res.data && (res.data.total || res.data.allRow) || 0}

    if (changeAfter) {
      const newState = changeAfter(res, pagination)
      core.setState(newState)

    } else {
      core.setState({
        dataSource: res && res.data && res.data.list || [],
        pagination,
      })
    }
  }

  queryList = (params, pageParams) => {
    const {props} = this
    const {config} = props
    const {request, changeAfterSuccess, options = {}} = config
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
    if (beforeQuery) {
      fixParams = beforeQuery(fixParams, this)
    }

    // request
    const paramsData = {...fixParams, ...page}
    const paramsDataClear = utils.objClear(paramsData)
    this.saveParams(paramsDataClear)

    const query = (queryParams) => {
      const queryResult = request(queryParams)
      return queryResult
    }

    const deal = (queryResult) => {
      if (queryResult && typeof queryResult.then === 'function') {
        queryResult.then(dealRes => {
          console.log('dealRes', dealRes)
        })
      }
      return queryResult
    }

    new Promise((resolve, reject) => { /* eslint-disable-line */
      resolve(paramsDataClear)
    }).then(query)
      .then(deal)
      .then((res = {data: {}}) => {
        const fixRes = (afterQuery && afterQuery(res, this)) || res
        fixRes && this.afterSuccess(fixRes, this, changeAfterSuccess)
      }).catch(e => {
      console.log('e', e)
    })

    // if (request) {
    //   console.log('request', request)
    //   console.log('request()', request())
    //   console.log('request().then', request().then)
    //   // request && request(paramsDataClear)
    //   //   .then(res => {
    //   //     // after
    //   //     const fixRes = (afterQuery && afterQuery(res, this)) || res
    //   //     fixRes && afterSuccess(fixRes, this)
    //   //   })
    // }

  }

  resetFilter = () => {
    const {options = {}} = this.props.config
    const {unResetFilterKey = []} = options

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
    let fixDataSource = []
    if (state.dataSource && state.dataSource instanceof Array) {
      fixDataSource = state.dataSource
    }


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
    } else if (filterConfig && listConfig) {
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
            dataSource={fixDataSource}
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