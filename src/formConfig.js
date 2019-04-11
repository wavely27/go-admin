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
  onOk: () => {
    console.log('ok')
  },
  form: [
    {
      component: "Cascader",
      itemKey: "position",
      label: "定位",
      itemProps: {
        wrapperCol: {span: 8}
      },
      fieldProps: {},
      innerProps: {
        style: {},
        placeholder: "请选择投放定位",
        options: positionOptions,
      }
    },
    {
      component: "Input",
      itemKey: "name",
      label: "投放名称",
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
      label: "投放排期",
      colSpan: 8,
      itemProps: {},
      innerProps: {
        placeholder: "请选择排期开始时间",
      }
    },
    {
      component: "DatePicker",
      itemKey: "startTime1",
      prefix: '至',
      itemProps: {},
      innerProps: {
        style: {},
        placeholder: "请选择排期终止时间",
      }
    },
    {
      component: "DatePicker",
      itemKey: "startTime2",
      itemProps: {},
      innerProps: {
        style: {},
        placeholder: "请选择投放排期",
      }
    },
    {
      component: "DatePicker",
      itemKey: "startTime3",
      label: "投放排期",
      itemProps: {},
      innerProps: {
        placeholder: "请选择投放排期",
      }
    },
  ]
}

const elementList = [{
  "templateId": null,
  "fieldId": "57",
  "fieldName": "bannerImage",
  "fieldType": "upLoadImage",
  "fieldDesc": "图片",
  "fieldRequired": 0,
  "fieldAttribute": {
    "width": 375,
    "url": null,
    "height": 100
  },
  "fieldValue": "",
  "mateType": 1
}, {
  "templateId": null,
  "fieldId": "58",
  "fieldName": "text",
  "fieldType": "inputText",
  "fieldDesc": "字符",
  "fieldRequired": 0,
  "fieldAttribute": {
    "length": 10,
    "url": null
  },
  "fieldValue": "",
  "mateType": 1
}
]



const selectElem = (elem) => {
  const {fieldType, fieldDesc, fieldId} = elem
  switch (fieldType) {
    case 'upLoadImage':
      formConfig.form.push({
        component: "Input",
        itemKey: fieldId,
        label: fieldDesc,
        innerProps: {
          placeholder: `请输入${fieldDesc}`,
        }
      })
      break;
    case 'inputText':
      return {
        component: "Input",
        itemKey: fieldId,
        label: fieldDesc,
        innerProps: {
          placeholder: `请输入${fieldDesc}`,
        }
      }
    default:
      return null
  }
  return null
}

/*
const selectAttr = (obj, key) => {
  switch (key) {
    case 'upLoadImage':
      formConfig.form.push({
        component: "Input",
        itemKey: fieldId,
        label: fieldDesc,
        innerProps: {
          placeholder: `请输入${fieldDesc}`,
        }
      })
      break;
    case 'inputText':
      return {
        component: "Input",
        itemKey: fieldId,
        label: fieldDesc,
        innerProps: {
          placeholder: `请输入${fieldDesc}`,
        }
      }
    default:
      return null
  }
  return null
}
*/

elementList.forEach((elem) => {
  const {fieldAttribute} = elem
  selectElem(elem)
  if (fieldAttribute.length !== 0) {
    // Object.keys(fieldAttribute).forEach((attr) => {
      // selectAttr(fieldAttribute, attr)
    // })
  }

})

export default {
  formConfig,
}