import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'

export class AllItems extends Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.fetchItems()
    }
    
    render(){
        return (
        <div>
            <h1>All Items Component</h1>
            {/* <h3>Welcome, {email}</h3> */}
        </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    item: state.item.allItems
  }
}

const mapDispatch = dispatch => {
    return {
        //Thunk to display all items from the allItems state
        fetchItems: () => dispatch(getItemsThunk())
    }
}

export default connect(mapState, mapDispatch)(AllItems)

/**
 * PROP TYPES
 */
