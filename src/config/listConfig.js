import {Divider, Icon} from "antd";
import React from "react";
// import history from '@/common/route/history'
// import {getDeliveryList, deliveryOnline, deliveryOffline} from '@/services/apis/delivery'

const filterConfig = {
  options: {
    layout: 'horizontal',
    colCount: 4,
    // layout: 'vertical',
  },
  form: [
    {
      component: "Cascader",
      itemKey: "position",
      label: "定位",
      holder: 2,
      itemProps: {
        wrapperCol: {span: 16}
      },
      fieldProps: {},
      innerProps: {
        placeholder: "请选择投放定位",
        options: [],
      }
    },
    {
      component: "Input",
      itemKey: "name",
      label: "招商名称",
      innerProps: {
        placeholder: "请输入招商名称",
      }
    },
    {
      component: "Input",
      itemKey: "id",
      label: "活动ID",
      innerProps: {
        placeholder: "请输入活动ID",
      }
    },
    {
      component: "DatePicker",
      itemKey: "startTime",
      label: "投放开始",
      innerProps: {
        placeholder: "请输入投放开始时间",
      }
    },
  ]
}

const operationConfig = {
  button: [
    {
      label: (
        <span>
          <Icon type="add" />
          {'新建投放'}
        </span>
      ),
      opStyle: {

      },
      onClick: (core) => {

        console.log('core', core)
      }
    },
  ]
}

const data = [{
  "creator": 1,
  "deliveryId": 1,
  "deliveryName": "string1",
  "elementList": [
    {
      "fieldAttribute": {},
      "fieldDesc": "string",
      "fieldId": "el1",
      "fieldName": "描述1",
      "fieldRequired": 0,
      "fieldType": "text", // 元素类型 image 、 text 描述 、 url
      "fieldValue": "描述1",
      "mateType": 1,
      "templateId": 1
    }, {
      "fieldAttribute": {},
      "fieldDesc": "string",
      "fieldId": "el2",
      "fieldName": "图片预览2", // 暂不需要
      "fieldRequired": 1,
      "fieldType": "image",
      "fieldValue": "图片预览2",
      "mateType": 2,
      "templateId": 2
    },
  ],
  "endTime": 1,
  "modifier": 1,
  "positionId": 1,
  "resourceId": 1,
  "startTime": 1,
  "status": 1,
  "templateId": 1
}];

const {elementList} = data[0]

const columns0 = [{
  title: '投放ID',
  dataIndex: 'deliveryId',
  key: 'deliveryId',
  width: 160,
}, {
  title: '投放名称',
  dataIndex: 'deliveryName',
  key: 'deliveryName',
  width: 160,
}];

elementList.forEach((obj) => {

  columns0.push({
    title: obj.fieldName,
    dataIndex: obj.fieldId,
    key: obj.fieldId,
    render: (text, record) => {
      return (
        <div>
          {record.fieldValue}
        </div>
      )
    }
  })
})

const handleOn = (record) => {
  const {deliveryId} = record
  console.log('deliveryId', deliveryId)
}

const handleOff = (record) => {
  const {deliveryId} = record
  console.log('deliveryId', deliveryId)
}

const columns2 = [{
  title: '操作人',
  dataIndex: 'creator',
  key: 'creator',
  width: 120,
}, {
  title: '活动排期',
  dataIndex: 'startTime',
  key: 'startTime',
  width: 220,
}, {
  title: '状态',
  dataIndex: 'statusStr',
  key: 'statusStr',
  width: 120,
}, {
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
                  handleOff(record)
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
                  handleOn(record)
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

const columns = columns0.concat(columns2)

const listConfig = {
  options: {
    "rowKey": "deliveryId",
  },
  columns,
  data,
}

export default {
  filterConfig,
  operationConfig,
  listConfig,
  request: () => {
    console.log('request')
  },
}