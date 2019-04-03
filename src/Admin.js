import React, { Component } from 'react';
import {Button} from 'antd'
import PropTypes from 'prop-types';
import './App.css';

class GoAdmin extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {props} = this
    const {config} = props

    console.log('render-config', config)
    return (
      <div className="App">
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
      </div>
    );
  }
}

GoAdmin.defaultProps = {
  config: {b: 2}
}

GoAdmin.propTypes = {
  config: PropTypes.object,
}

export default GoAdmin;
