import React, {Component} from 'react'
import {
  Table
} from 'antd'
import PropTypes from "prop-types";

class List extends Component {

  static defaultProps = {
    core: {},
    config: {
      columns: [],
      data: [],
    },
    dataSource: [],
    pagination: {},
  }

  static propTypes = {
    config: PropTypes.object,
    core: PropTypes.object,
    dataSource: PropTypes.array,
    pagination: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  fixColumns = (columns) => {
    const {core} = this.props
    const result = columns.map((col) => {
      const fixedCol = Object.assign({}, col) /* eslint-disable-line */
      if (col.render) {
        fixedCol.render = (text, record, index) => {
          return col.render(text, record, index, core)
        }
      }
      return fixedCol
    })
    return result
  }

  updateTablePage = (page, pageSize) => {
    console.log('page, pageSize', page, pageSize)
    const {props} = this
    props.core.savePagination({
      page,
      pageSize,
    })
    props.core.refresh(null, {
      page,
      pageSize,
    })
  }

  showTotal = (total) => {
    return `共 ${total} 条数据`
  }

  render() {
    const {props} = this
    const {config, dataSource, pagination} = props
    const {options, columns} = config
    const fixedColumns = this.fixColumns(columns)

    return (
      <Table
        style={{
          padding: '0 32px 24px',
        }}
        {...options}
        pagination={{
          size: pagination.size || "middle",
          current: pagination.page || 1,
          page: pagination.page || 1,
          pageSize: pagination.pageSize,
          total: pagination.total || 0,
          onChange: this.updateTablePage,
          showTotal: this.showTotal
        }}
        columns={fixedColumns}
        dataSource={dataSource}
      />
    )
  }
}

export default List
