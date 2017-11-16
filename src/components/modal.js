import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class Modal extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log('en DidMount');
    this.modalTarget = document.createElement('div');
    this.modalTarget.className='modal';
    document.body.appendChild(this.modalTarget);
    this._render();
  }
  componentWillUpdate(){
    console.log('en WillUpdate');
    this._render();
  }
  componentWillUnmount(){
    console.log('en Unmount');
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }
  _render(){
    console.log('en _render');
    ReactDOM.render(
      <div>
        <h1>hola a todos</h1>
        {this.props.children}
      </div>,
      this.modalTarget
    );
  }
  render(){
    console.log('en render');
    return  <noscript />;
  }
}

export default Modal;
