import React, {Component} from 'react'
import {
  Form, Row, Col, Button, Icon,
} from 'antd'
import PropTypes from "prop-types";
import getItem from './getItem'

const {Item} = Form

class FormContent extends Component {

  static defaultProps = {
    form: {},
    formConfig: null,
    filterConfig: null,
  }

  static propTypes = {
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
      const {label, itemKey, prefix, colSpan, itemProps={}, fieldProps={}, holder=1} = item

      const prefixWrap = prefix && <span style={{paddingRight: 20}}>{prefix}</span>
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
    const {formConfig, filterConfig} = props

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
      console.log('formConfig123', formConfig)
      const {onOk} = formConfig
      more = null
      btn = (
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button type="primary" onClick={()=>onOk(props.form, formConfig.params)}>保存</Button>
            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
              返回
            </Button>
          </Col>
        </Row>
      )
    }

    // console.log('this.props', this.props)
    return (
      <Form
        style={{
          padding: '34px',
          background: '#fbfbfb',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
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