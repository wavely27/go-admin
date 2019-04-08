import {Divider, Tag} from "antd";
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
  colCount: 4,
  form: [
    {
      component: "Cascader",
      itemKey: "position",
      label: "定位",
      fieldProps: {},
      itemProps: {
        placeholder: "请选择投放定位",
        options: positionOptions,
      }
    },
    {
      component: "Input",
      itemKey: "name",
      label: "招商名称",
      itemProps: {
        placeholder: "请输入招商名称",
      }
    },
    {
      component: "Input",
      itemKey: "id",
      label: "活动ID",
      itemProps: {
        placeholder: "请输入活动ID",
      }
    },
    {
      component: "DatePicker",
      itemKey: "startTime",
      label: "投放开始",
      itemProps: {
        placeholder: "请输入投放开始时间",
      }
    },
  ]
}

const operationConfig = {

}

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === 'loser') {
          color = 'volcano';
        }
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="">
        Invite
        {record.name}
      </a>
      <Divider type="vertical" />
      <a href="">Delete</a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];

const listConfig = {
  columns,
  data,
}

export default {
  filterConfig,
  operationConfig,
  listConfig,
}