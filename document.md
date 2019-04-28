## Admin

### core
```js
// type1 // 表单
const configType1 = {
  formConfig: {}
}
// type2 // 列表
const service = {
  interface: () => {
    const response = {data: 'data'}
    return response
  }
}

const configType2 = {
  filterConfig: {},
  OperationConfig: {},
  listConfig: {},
  request: service.interface,
  options: {
    MountQuery: true, // 是否初始化查询 default true
    unResetFilterKey: [], // arr 不被重置的表单字段
    beforeQuery,
    afterQuery,
    paginationKey: [pageNo, pageSize], // arr default [pageNo, pageSize]
    changeAfterSuccess: (res, pagination) => {
      const dataSource = res.data.list
      return {dataSource, pagination}
    }, // func default 
  }
}

```



### formCore and filterConfig
```js

const formConfig = {
  onOK: (form, params, core) => {}, // 提交按钮
  form: [
    {
      disable: true, // 是否展示 this is default
      label: 'label or ReactDOM',
      itemKey: 'key',
      prefix: 'prefix or ReactDOM', // 前缀
      prefixWrapStyle: {padding: '0 12 0 12'}, // this is default
      suffix: 'suffix or ReactDOM', // 后缀
      suffixWrapStyle: {padding: '0 12 0 12'}, // this is default
      colSpan: 24, // 此行栅格值 最大24
      itemProps: {}, // FormItem 的参数
      fieldProps: {}, // getFieldDecorator 的 options
      innerProps: {}, // 所使用组件 的参数
      holder: 1, // 所占的栅格数 colSpan = colSpan * holder
      follow: false, // 是否跟随上个组件 this is default // 此状态下 colSpan holder 无效 使用第一个follow元素的配置
      ifAction: (form, core) => {
        return {} // formItem 如 disable label
      }
    },
  ],
  options: {
    layout: 'vertical', // 布局 水平（horizontal） or 垂直（vertical）
    formProps: {}     // Form options
  },
}

const filterConfig = {
  form: [
    {
      disable: true, // 是否展示 this is default
      label: 'label or ReactDOM',
      itemKey: 'key',
      prefix: 'prefix or ReactDOM', // 前缀
      prefixWrapStyle: {padding: '0 12 0 12'}, // this is default
      suffix: 'suffix or ReactDOM', // 后缀
      suffixWrapStyle: {padding: '0 12 0 12'}, // this is default
      colProps: {}, // col 的参数
      itemProps: {}, // FormItem 的参数
      fieldProps: {}, // getFieldDecorator 的 options
      innerProps: {}, // 所使用组件 的参数
      follow: false, // 是否跟随上个组件 this is default // 此状态下 colSpan holder 无效 使用第一个follow元素的配置
      ifAction: (form, core) => {
        return {} // formItem 如 disable label
      }
    },
  ],
  options: {
    layout: 'horizontal', // 布局 水平（horizontal） or 垂直（vertical）
    static: false, // 对齐
    alignOptions: { // static 为true 才有效
      colCount: 3, // 一行几个元素 default 3
    },
    formProps: {}     // Form options
  },
}

const minConfig = {
  onOK, // 作为筛选器是可忽略
  form,
}

```








### OperationCore

### ListCore

