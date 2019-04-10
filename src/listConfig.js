import {Divider} from "antd";
import React from "react";

const positionOptions = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

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
        wrapperCol:{span: 16}
      },
      fieldProps: {},
      innerProps: {
        placeholder: "请选择投放定位",
        options: positionOptions,
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

const operationConfig = {}

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
    },{
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

elementList.forEach((obj, i) => {

  columns0.push({
    title: obj.fieldName,
    dataIndex: obj.fieldId,
    key: obj.fieldId,
    render: (text, record) => {
      // console.log('text, record', text, record)
      return (
        <div>
          {record.elementList[i].fieldValue}
        </div>
      )
    }
  })
})

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
  dataIndex: 'status',
  key: 'status',
  width: 120,
}, {
  title: '操作',
  key: 'action',
  width: 160,
  render: () => (
    <span>
      <a href="">
        修改
      </a>
      <Divider type="vertical" />
      <a href="">上线</a>
    </span>
  ),
}];

const columns = columns0.concat(columns2)

const listConfig = {
  "rowKey": "deliveryId",
  columns,
  data,
}

export default {
  filterConfig,
  operationConfig,
  listConfig,
}