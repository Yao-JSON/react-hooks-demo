import React, { Component, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { useMousePosition, useScroll } from './costom-hooks/hooks'


const Clicnt = () => {
  const position = useMousePosition();
  return [
    <div key='1'>
    X => {position[0]}
  </div>,
  <div key='2'>
    Y => {position[1]}
  </div>
  ]
}

const Child = (props) => {
  
  const [ size, setSize ] = useScroll([100,100]);
  return <div className="red" onScroll={(event) => {
    console.log(event);
  }}>
    <div>
      width: {size[0]}
    </div>
    <div>
      height: {size[1]}
    </div>
  </div>
}


class App extends Component {
  render() {
   
    return (
      <div className="App" ref={(app) => {
        this.app = app
      }}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Clicnt/>
          <Child parentRef={this.app}/>
        </header>
      </div>
    );
  }
}

export default App;
