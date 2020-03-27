import React from 'react';
import '../App.css';

class Button extends React.Component {
  state = {
    touched: false
  }

  toggleTouched = () => {
    this.props.onPress(this.props.next)
  }

 render () {
   return (
       <button
         className="btn"
         onMouseDown={this.toggleTouched}
         onMouseUp={this.handleMouseUp}
       >
         {this.props.title}
         {this.props.children}
       </button>
   )
 }
}

export default Button;
