import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'


class SingleItems extends Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.fetchItems()
    }
    
    render(){

        return (
            <div>
                <h1>THIS IS THE SINGLE ITEM Component</h1>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state, ownProps) => {
  return {
    items: state.item.selectedItem
  }
}

const mapDispatchToProps = dispatch => {
    return {
        //Thunk to display all items from the allItems state
        fetchItems: () => dispatch(getItemsThunk())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)

/**
 * PROP TYPES
 */
