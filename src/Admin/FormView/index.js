/* eslint-disable */
import React, {Component} from 'react'
import {
  Form, Row, Col, Button, Icon,
} from 'antd'
import PropTypes from "prop-types";
import getItem from './getItem'

const {Item} = Form

class FormContent extends Component {

  static defaultProps = {
    core: {},
    form: {},
    formConfig: null,
    filterConfig: null,
    fieldsValues: null,
  }

  static propTypes = {
    core: PropTypes.object,
    form: PropTypes.object,
    formConfig: PropTypes.object,
    filterConfig: PropTypes.object,
    fieldsValues: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      expand: false,
      action: {},
    }

    // resolveConfig
    const {core, formConfig, filterConfig} = props

    // default
    let formLayout, btn, getFormEleList

    if (formConfig) { // 表单 default
      const {onOk, onBack, options = {}} = formConfig

      // result
      getFormEleList = this.getItems
      btn = (
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button type="primary" onClick={() => onOk(props.form, formConfig.params, core)}>保存</Button>
            <Button style={{marginLeft: 8}} onClick={onBack}>
              返回
            </Button>
          </Col>
        </Row>
      )
    } else if (filterConfig) { // 过滤器
      const {options = {}, form} = filterConfig
      // setting
      formLayout = 'inline'
      getFormEleList = this.getItemDefault

      // 更多按钮
      let more

      if (options.align === true) { // 对齐
        formLayout = undefined
        more = (
          <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
            更多
            <Icon type={this.state.expand ? 'up' : 'down'}/>
          </a>
        )
        const {colCount} = options
        const {length} = form
        more = colCount >= length && null
        getFormEleList = this.getItems
      }

      // result
      btn = (
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button type="primary" onClick={this.handleSearch}>查询</Button>
            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
              重置
            </Button>
            {more}
          </Col>
        </Row>
      )
    }


    // result
    this.formLayout = formLayout
    this.btn = btn
    this.getFormEleList = getFormEleList
  }

  setValue = (value, key) => {
    const {form} = this.props
    form.setFieldsValue({
      [key]: value
    })
  }

/*  getItems = () => {
    const {props, state} = this
    const {formConfig, filterConfig, core, form} = props
    const {action} = state
    const config = formConfig || filterConfig
    let formFlag = false
    if (formConfig) {
      formFlag = true
    }

    const {getFieldDecorator} = props.form;

    const children = config.form.map((item, i) => {
      const {ifAction} = item

      const thisItem = ifAction && ifAction(form, core)
      let {label} = {...item, ...thisItem}
      let wrapLabel
      const {
        disable = false,
        itemKey,
        prefix,
        prefixWrapStyle = {},
        suffix,
        suffixWrapStyle = {},
        colProps = {},
        itemProps = {},
        fieldProps = {},
        follow
      } = {...item, ...thisItem}

      // const {labelStyle = {}} = itemProps
      const prefixWrap = prefix && <span style={{padding: '0 12 0 12', ...prefixWrapStyle}}>{prefix}</span>
      const suffixWrap = suffix && <span style={{padding: '0 12 0 12', ...suffixWrapStyle}}>{suffix}</span>
      const fixLabel = typeof label === 'string'
        // style={{width: 64, ...labelStyle}}
        ? <span>{label}</span>
        : label
      const labelEle = label && <div style={{display: 'inline-flex',}}>{fixLabel}</div>
      let child = (
        <div>{}</div>
      )

      // style
      let formItemLayout = {
        labelCol: {
          xs: {span: 24},
          sm: {span: 4},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 20},
        },
      };
      let display = 'flex'
      if (follow || (config.form && config.form[i + 1] && config.form[i + 1].follow)) {
        display = 'inline-flex'
        formItemLayout = {}
        if (!follow) {
          formItemLayout = {
            labelCol: {
              xs: {span: 24},
              sm: {span: 4},
            },
          }
          wrapLabel = label
          if (fieldProps.rules) {
            fieldProps.rules.forEach(rule => {
              if (rule.required === true) {
                wrapLabel = (
                  <span>
                    <span>*</span>
                    {wrapLabel}
                  </span>
                )
              }
            })
          }
          label = undefined
        }
      }

      child = (
        !disable ? (
          <Item
            key={`item-${i}`}
            label={labelEle}
            {...formItemLayout}
            {...itemProps}
            style={{display, position: 'relative', textAlign: 'left', ...itemProps.style}}
          >
            {prefixWrap}
            {getFieldDecorator(itemKey, {...fieldProps})(
              getItem({
                ...item,
                setValue: this.setValue
              }, formFlag, core, itemKey, action)
            )}
            {suffixWrap}
          </Item>
        ) : null
      )
      return {wrapLabel, follow, colProps, formItemLayout, child}
    })
    return children;
  }

  getCols = () => {
    // 生成行
    const {props, state} = this
    const {formConfig, filterConfig, core, form} = props
    const config = formConfig || filterConfig
    const {colCount = 3, layout} = config.options
    const {getFieldDecorator} = props.form;
    const {action} = state


    // const colNumber =
    //   layout === 'horizontal'
    //     ? Math.ceil(24 / colCount)
    //     : 24
    // const count = state.expand ? 10 : colCount * 2;
    //
    // const itemList = this.getItems()
    // const loopLength = itemList.length
    // const fieldList = []
    // for (let i = 0; i < loopLength; i++) {
    //   const child = {
    //     colProps: itemList[i].colProps,
    //     child: itemList[i].child,
    //   }
    //   if (itemList[i + 1] && itemList[i + 1].follow === true) {
    //     const children = [child]
    //     for (let j = i + 1; itemList[j].follow === true; j++) {
    //       const nextChild = {
    //         colProps: itemList[j].colProps,
    //         child: itemList[j].child,
    //       }
    //       i++
    //       children.push(nextChild)
    //     }
    //     fieldList.push(children)
    //   } else {
    //     fieldList.push(child)
    //   }
    // }
    // console.log('fieldList---------', fieldList)

    // const colList = fieldList.map((item, i) => {
    //   if (item instanceof Array) {
    //     const {colProps} = item[0]
    //     const children = item.map(items => items.child)
    //
    //     const {formItemLayout} = children[0]
    //     const wrapped = (
    //       <div>
    //         <Col {...formItemLayout}>
    //           {children[0].wrapLabel}
    //         </Col>
    //         <span>
    //           {children}
    //         </span>
    //       </div>
    //     )
    //     return (
    //       <Col
    //         span={colNumber}
    //         key={`col-${i}`}
    //         {...colProps}
    //         style={{display: layout !== 'horizontal' || i < count ? 'block' : 'none', padding: 0, ...colProps.style}}
    //       >
    //         {wrapped}
    //       </Col>
    //     )
    //   } else {
    //     const {colProps, child} = item
    //     return (
    //       <Col
    //         span={colNumber}
    //         key={`col-${i}`}
    //         {...colProps}
    //         style={{display: layout !== 'horizontal' || i < count ? 'block' : 'none', padding: 0, ...colProps.style}}
    //       >
    //         {child}
    //       </Col>
    //     )
    //   }
    // })

    const colList = config.form.map((item, i) => {
      const {itemKey, fieldProps, label} = item
      let formFlag = false
      return <Item
        label={label}
        key={`item-${i}`}
      >
        {getFieldDecorator(itemKey, {...fieldProps})(
          getItem({
            ...item,
            setValue: this.setValue
          }, formFlag, core, itemKey, action)
        )}
      </Item>
    })

    return colList
  }*/


  getItemDefault = () => {
    const {props, state} = this
    const {formConfig, filterConfig, core, form} = props
    const {action} = state
    const config = formConfig || filterConfig
    let formFlag = false
    if (formConfig) {
      formFlag = true
    }

    const {getFieldDecorator} = props.form;

    const children = config.form.map((item, i) => {
      const {ifAction} = item

      const thisItem = ifAction && ifAction(form, core)
      let {label} = {...item, ...thisItem}
      let wrapLabel
      const {
        disable = false,
        itemKey,
        prefix,
        prefixWrapStyle = {},
        suffix,
        suffixWrapStyle = {},
        colProps = {},
        itemProps = {},
        fieldProps = {},
        follow
      } = {...item, ...thisItem}

      // const {labelStyle = {}} = itemProps
      const prefixWrap = prefix && <span style={{padding: '0 12 0 12', ...prefixWrapStyle}}>{prefix}</span>
      const suffixWrap = suffix && <span style={{padding: '0 12 0 12', ...suffixWrapStyle}}>{suffix}</span>
      const fixLabel = typeof label === 'string'
        // style={{width: 64, ...labelStyle}}
        ? <span>{label}</span>
        : label
      const labelEle = label && <div style={{display: 'inline-flex',}}>{fixLabel}</div>
      let child = (
        <div>{}</div>
      )

      // style
      let formItemLayout = {
        labelCol: {
          xs: {span: 24},
          sm: {span: 4},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 20},
        },
      };
      let display = 'flex'
      if (follow || (config.form && config.form[i + 1] && config.form[i + 1].follow)) {
        display = 'inline-flex'
        formItemLayout = {}
        if (!follow) {
          formItemLayout = {
            labelCol: {
              xs: {span: 24},
              sm: {span: 4},
            },
          }
          wrapLabel = label
          if (fieldProps.rules) {
            fieldProps.rules.forEach(rule => {
              if (rule.required === true) {
                wrapLabel = (
                  <span>
                    <span>*</span>
                    {wrapLabel}
                  </span>
                )
              }
            })
          }
          label = undefined
        }
      }

      child = (
        !disable ? (
          <Item
            key={`item-${i}`}
            label={labelEle}
            {...formItemLayout}
            {...itemProps}
            style={{display, position: 'relative', textAlign: 'left', ...itemProps.style}}
          >
            {prefixWrap}
            {getFieldDecorator(itemKey, {...fieldProps})(
              getItem({
                ...item,
                setValue: this.setValue
              }, formFlag, core, itemKey, action)
            )}
            {suffixWrap}
          </Item>
        ) : null
      )
      return {wrapLabel, follow, colProps, formItemLayout, child}
    })
    return children;
  }

  getItems = () => {
    return 'abc'
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        return
      }
      this.props.core.queryList(values, {pageNo: 1})
    });
  }

  handleReset = () => {
    this.props.core.resetFilter()
  }

  toggle = () => {
    const {expand} = this.state;
    this.setState({expand: !expand});
  }

  render() {
    /*    const {core, formConfig, filterConfig} = props

        // default
        let formLayout, formEleList, btn, test, getformEleList

        if (formConfig) { // 表单 default
          const {onOk, onBack, options={}} = formConfig

          // result
          getformEleList = this.getItems
          btn = (
            <Row>
              <Col span={24} style={{textAlign: 'right'}}>
                <Button type="primary" onClick={() => onOk(props.form, formConfig.params, core)}>保存</Button>
                <Button style={{marginLeft: 8}} onClick={onBack}>
                  返回
                </Button>
              </Col>
            </Row>
          )
        } else if (filterConfig) { // 过滤器
          const {options={}, form} = filterConfig
          // setting
          formLayout = 'inline'
          getformEleList = this.getItems
          // 更多按钮
          let more = (
            <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
              更多
              <Icon type={this.state.expand ? 'up' : 'down'} />
            </a>
          )

          if (options.align === true) { // 对齐
            formLayout = undefined
            const {colCount} = options
            const {length} = form
            more = colCount >= length && null
            getformEleList = this.getItems
          }

          // result
          formEleList = getformEleList()
          btn = (
            <Row>
              <Col span={24} style={{textAlign: 'right'}}>
                <Button type="primary" onClick={this.handleSearch}>查询</Button>
                <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                  重置
                </Button>
                {more}
              </Col>
            </Row>
          )
        }*/

    const {formLayout, getFormEleList, btn} = this

    return (
      <Form
        layout={formLayout}
        style={{
          padding: '32px',
        }}
      >
        {getFormEleList()}
        {btn}
      </Form>
    )
  }
}

const FormView = Form.create({
  mapPropsToFields(props) {
    const result = {}
    const {fieldsValues, filterConfig, formConfig} = props
    const config = filterConfig || formConfig
    const {options} = config
    if (fieldsValues || options) {
      let data = options.updateValues
      if (fieldsValues && JSON.stringify(fieldsValues) !== "{}") {
        data = fieldsValues
      }
      if (data) {
        Object.keys(data).forEach((key) => {
          let realValue
          if (data[key] && data[key].value) {
            realValue = data[key].value
          } else {
            realValue = data[key]
          }
          result[key] = Form.createFormField({
            ...data[key],
            value: realValue,
          })
        })
      }
    }
    return result
  }
})(FormContent)

export default FormView