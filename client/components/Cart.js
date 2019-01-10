import React, {Component} from 'react'
import {connect} from 'react-redux'


class Cart extends Component {
    constructor(){
        super()
    }

    componentDidMount(){
        
    }
    
    render(){
        return (
            <div>
               <h1>Hello! You are seeing your cart now!</h1>

               <button type='button' id='Checkout'> Checkout </button>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

/**
 * PROP TYPES
 */
