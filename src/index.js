import React, {Component} from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import './style.css'
import {LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Admin from "./Admin";
// import config from './listConfig'
import config from './formConfig'


class GoAdmin extends Component {

  static defaultProps = {
    config: {}
  }

  static propTypes = {
    config: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // const {config} = this.props
    return (
      <LocaleProvider locale={zhCN}>
        <Admin config={config} />
      </LocaleProvider>
    )
  }
}

ReactDom.render(
  <div className='content'>
    <GoAdmin />
  </div>
  ,
  document.getElementById('root')
)

export default GoAdmin