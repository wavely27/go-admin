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

const formConfig = {
  options: {
    // layout: 'horizontal',
    // colCount: 4,
    // layout: 'vertical',
  },
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

export default {
  formConfig,
}