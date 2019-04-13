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
  }

  static propTypes = {
    core: PropTypes.object,
    form: PropTypes.object,
    formConfig: PropTypes.object,
    filterConfig: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      expand: false
    }
  }

  getFields = () => {
    const {props, state} = this
    const {formConfig, filterConfig} = props
    const config = formConfig || filterConfig
    const {colCount=3, layout} = config.options
    let formFlag = false
    if (formConfig) {
      formFlag = true
    }
    const colNumber =
      layout === 'horizontal'
        ? Math.ceil(24 / colCount)
        : 24
    const count = state.expand ? 10 : colCount * 2;
    const {getFieldDecorator} = props.form;

    const children = config.form.map((item, i) => {
      const {label, itemKey, prefix, suffix, colSpan, itemProps={}, fieldProps={}, holder=1} = item

      const prefixWrap = prefix && <span style={{paddingRight: 12}}>{prefix}</span>
      const suffixWrap = suffix && <span style={{paddingLeft: 12}}>{suffix}</span>
      const fixLabel = typeof label === 'string'
        ? <span style={{width: 64}}>{label}</span>
        : label
      let labelEle = <div style={{display: 'inline-flex',}}>{fixLabel}</div>
      let child = (
        <div>{}</div>
      )
      if (label === undefined) {
        labelEle = undefined
        child = (
          <Col span={colSpan || 8 * holder} key={i} style={{display:layout !== 'horizontal' || i < count ? 'block' : 'none'}}>
            <Item label={labelEle} {...itemProps} style={{display: 'flex', ...itemProps.style}}>
              {prefixWrap}
              {getFieldDecorator(itemKey, {
                ...fieldProps
              })(
                getItem(item, formFlag)
              )}
              {suffixWrap}
            </Item>
          </Col>
        )
      } else {
        child = (
          <Col span={colSpan || colNumber * holder} key={i} style={{display:layout !== 'horizontal' || i < count ? 'block' : 'none'}}>
            <Item label={labelEle} {...itemProps} style={{display: 'flex', ...itemProps.style}}>
              {prefixWrap}
              {getFieldDecorator(itemKey, {
                ...fieldProps
              })(
                getItem(item, formFlag)
              )}
              {suffixWrap}
            </Item>
          </Col>
        )
      }
      return child
    })
    return children;
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);

      this.props.core.queryList()
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const {expand} = this.state;
    this.setState({expand: !expand});
  }

  render() {
    const {props} = this
    const {core, formConfig, filterConfig} = props

    let more = (
      <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
        更多
        <Icon type={this.state.expand ? 'up' : 'down'} />
      </a>
    )

    if (filterConfig) {
      const {colCount} = filterConfig.options
      const {length} = filterConfig.form
      more = colCount >= length && null
    }

    // btn
    let btn = (
      <Row>
        <Col span={24} style={{textAlign: 'right'}}>
          <Button type="primary" htmlType="submit">查询</Button>
          <Button style={{marginLeft: 8}} onClick={this.handleReset}>
            重置
          </Button>
          {more}
        </Col>
      </Row>
    )
    if (formConfig) {
      const {onOk, onBack} = formConfig
      more = null
      btn = (
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button type="primary" onClick={()=>onOk(props.form, formConfig.params, core)}>保存</Button>
            <Button style={{marginLeft: 8}} onClick={onBack}>
              返回
            </Button>
          </Col>
        </Row>
      )
    }

    return (
      <Form
        style={{
          padding: '32px',
        }}
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>{this.getFields()}</Row>
        {btn}
      </Form>
    )
  }
}

const FormView = Form.create()(FormContent)

export default FormView