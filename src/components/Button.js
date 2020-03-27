import React from 'react';
import '../App.css';

class Button extends React.Component {
  state = {
    touched: false
  }

  toggleTouched = () => {
    this.setState( prevState => ({
      touched: !prevState.touched
    }));
    this.props.onPress(this.props.next)
  }

  handleMouseUp = () => {
     // Handle smooth animation when clicking without holding
     setTimeout( () => {
       this.setState({ touched: false });
     }, 150);
  }

 render () {
   const { touched } = this.state;
   const className = touched ? 'btn touched' : 'btn';
   return (
       <button
         className={className}
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
