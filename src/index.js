import React, {Component} from 'react'
// import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import './style.css'
import {LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import Admin from "./Admin";

// import config from './config/listConfig'

class GoAdmin extends Component {

  static defaultProps = {
    config: {},
    history: {},
  }

  static propTypes = {
    config: PropTypes.object,
    history: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {props} = this
    return (
      <LocaleProvider locale={zhCN}>
        <Admin config={props.config} title={props.title} ref={core => this.core = core} history={props.history} />
      </LocaleProvider>
    )
  }
}

// ReactDom.render(
//   <div className='content'>
//     <GoAdmin config={config} />
//   </div>
//   ,
//   document.getElementById('root')
// )

export {
  // GoModal
}

export default GoAdmin
