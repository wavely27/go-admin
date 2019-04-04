import React, {Component} from 'react'
import {Button} from 'antd'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types';
import './style.css'

class GoAdmin extends Component {

  static defaultProps = {
  config: {}

}

  static propTypes = {
    config: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      config: props.config
    }
  }



  render() {
    const {config} = this.state
    console.log('config', config)
    return (
      <div>
        <Button type='primary'>primary</Button>
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

// test list
// GoAdmin
//
//
//
//

ReactDom.render(
  <div className='content'>
    <GoAdmin />
  </div>
  ,
  document.getElementById('root')
)

const Com = {
  GoAdmin
}

export default Com