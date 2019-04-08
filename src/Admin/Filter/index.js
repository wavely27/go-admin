import React, {Component} from 'react'
import {
  Form, Row, Col, Button, Icon,
} from 'antd'
import PropTypes from "prop-types";
import getItem from './getItem'

const {Item} = Form

class FilterForm extends Component {

  static defaultProps = {
    form: {},
    config: {
      form: []
    }
  }

  static propTypes = {
    form: PropTypes.object,
    config: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      expand: false
    }
  }

  getFields = () => {
    const {props, state} = this
    const {config} = props
    const {colCount} = config
    const colNumber = Math.ceil(24 / colCount)
    const count = state.expand ? 10 : colCount * 2;
    const {getFieldDecorator} = props.form;

    const children = config.form.map((item, i) => {
      const {label, itemKey, fieldProps={}} = item

      const fixLabel = typeof label === 'string'
        ? <span style={{width: 60}}>{label}</span>
        : label
      const labelEle = <div style={{display: 'inline-flex',}}>{fixLabel}</div>
      const child = (
        <Col span={colNumber} key={i} style={{display: i < count ? 'block' : 'none'}}>
          <Item label={labelEle} style={{display: 'flex'}}>
            {getFieldDecorator(itemKey, {
              ...fieldProps
            })(
              getItem(item)
            )}
          </Item>
        </Col>
      )

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
    const {config} = props
    const {colCount} = config
    const {length} = config.form
    console.log('this, config', this, config)
    return (
      <Form
        style={{
          padding: '24px',
          background: '#fbfbfb',
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
        }}
        onSubmit={this.handleSearch}
      >
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
              重置
            </Button>
            {
              colCount < length
                ? (
                  <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
                    更多
                    <Icon type={this.state.expand ? 'up' : 'down'} />
                  </a>
                )
                : null
            }

          </Col>
        </Row>
      </Form>
    )
  }
}

const Filter = Form.create()(FilterForm)

export default Filter