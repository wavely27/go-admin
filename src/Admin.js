import React, { Component } from 'react';
import {Button} from 'antd'
import './App.css';

class GoAdmin extends Component {
  render() {
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

export default GoAdmin;
