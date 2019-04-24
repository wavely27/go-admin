import {Divider, Icon} from "antd";
import React from "react";
// import history from '@/common/route/history'
// import {getDeliveryList, deliveryOnline, deliveryOffline} from '@/services/apis/delivery'

const demofilterConfig = { /* eslint-disable-line */
  options: {
    layout: 'horizontal',
    colCount: 4,
    // layout: 'vertical',
  },
  form: [
    {
      component: "Select",
      itemKey: "status",
      label: "状态",
      itemProps: {

      },
      fieldProps: {
        initialValue: 1,
      },
      innerProps: {
        placeholder: "请选择影片状态",
        options: [
          {key: 1, value: '正在热映'},
          {key: 2, value: '即将上映'}
        ]
      }
    },
  ]
}

const demoOperationConfig = { /* eslint-disable-line */
  opStyle: {},
  button: [
    {
      label: (
        <span>
          <Icon type="plus" />
          {'新建投放'}
        </span>
      ),
      onClick: (e, core) => {
        console.log('core', core)
      }
    },
  ]
}

const demoColumns = [{
  title: '电影ID',
  dataIndex: 'id',
  align: 'center',
  key: 'id',
  width: 220,
}, {
  title: '电影名称',
  dataIndex: 'name',
  key: 'name',
  width: 220,
},{
  title: '展示状态',
  dataIndex: 'creator',
  key: 'creator',
  width: 220,
},{
  title: '操作',
  key: 'action',
  width: 160,
  render: (text, record) => (
    <span>
      <a
        href=""
        onClick={
          (e) => {
            e.preventDefault()
            console.log('history.push', record.deliveryId)
            // history.push({
            //   url: '',
            //   data: {}
            // })
          }
        }
      >
        修改
      </a>
      <Divider type="vertical" />
      {
        record.status === 1
          ? (
            <a
              href=""
              onClick={
                (e) => {
                  e.preventDefault()
                  // handleOff(record)
                }
              }
            >
              下线
            </a>
          )
          : (
            <a
              href=""
              onClick={
                (e) => {
                  e.preventDefault()
                  // handleOn(record)
                }
              }
            >
              上线
            </a>
          )
      }
    </span>
  ),
}];

const demoListConfig = { /* eslint-disable-line */
  options: {
    "rowKey": "movieId",
  },
  columns: demoColumns,
}

const filterConfig = {
  options: {
    layout: 'horizontal',
    colCount: 4,
    // layout: 'vertical',
  },
  form: [
    {
      component: "Select",
      itemKey: "status",
      label: "状态",
      fieldProps: {
        initialValue: 1,
      },
      innerProps: {
        placeholder: "请选择影片状态",
        options: [
          {key: 1, value: '正在热映'},
          {key: 2, value: '即将上映'}
        ]
      }
    },
  ]
}

// const operationConfig = {}

const columns = [{
  title: '电影ID',
  dataIndex: 'id',
  align: 'center',
  width: 220,
}, {
  title: '电影名称',
  dataIndex: 'name',
  align: 'center',
  width: 220,
},{
  title: '展示状态',
  dataIndex: 'creator',
  align: 'center',
  width: 220,
},{
  title: '操作',
  key: 'action',
  align: 'center',
  width: 160,
  render: (text, record) => (
    <span>
      <a
        href=""
        onClick={
          (e) => {
            e.preventDefault()
            console.log('history.push', record.deliveryId)
            // history.push({
            //   url: '',
            //   data: {}
            // })
          }
        }
      >
        修改
      </a>
      <Divider type="vertical" />
      {
        record.status === 1
          ? (
            <a
              href=""
              onClick={
                (e) => {
                  e.preventDefault()
                  // handleOff(record)
                }
              }
            >
              下线
            </a>
          )
          : (
            <a
              href=""
              onClick={
                (e) => {
                  e.preventDefault()
                  // handleOn(record)
                }
              }
            >
              上线
            </a>
          )
      }
    </span>
  ),
}];
/*
const handleOn = (record) => {
  const {deliveryId} = record
  console.log('deliveryId', deliveryId)
}
const handleOff = (record) => {
  const {deliveryId} = record
  console.log('deliveryId', deliveryId)
}
*/

const listConfig = {
  options: {
    "rowKey": "movieId",
  },
  columns,
}

export default {
  filterConfig,
  // operationConfig,
  listConfig,
  request: () => {
    return new Promise((resolve, reject) => { /* eslint-disable-line */
      setTimeout(() => {
        resolve({ps: 666})
      }, 1000)
    })
  },
}