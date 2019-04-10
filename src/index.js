import React, {Component} from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import './style.css'
import {LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Admin from "./Admin";
// import globalConfig from './listConfig'
import globalConfig from './formConfig'


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
    const {config} = this.props
    return (
      <LocaleProvider locale={zhCN}>
        <Admin config={config} ref={core => this.core = core} />
      </LocaleProvider>
    )
  }
}

ReactDom.render(
  <div className='content'>
    <GoAdmin config={globalConfig} />
  </div>
  ,
  document.getElementById('root')
)

export default GoAdmin