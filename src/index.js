import React, {Component} from 'react'
// import {Button} from 'antd'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import './style.css'
import Admin from "./Admin";
import config from './config'

class GoAdmin extends Component {

  static defaultProps = {
  config: {
    filterConfig: {},
    operationConfig: {},
    listConfig: {},
  }

}

  static propTypes = {
    config: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
        <Admin config={config} />
      </div>
    )
  }
}

// Com.defaultProps = {
//   config: {}
// }
//
// Com.propTypes = {
//   config: PropTypes.object,
// }

ReactDom.render(
  <div className='content'>
    <GoAdmin />
  </div>
  ,
  document.getElementById('root')
)

/*
const GoAdmin = {
  a: 2
}
*/

export default GoAdmin