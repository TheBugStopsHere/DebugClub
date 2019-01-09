import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'

class AllItems extends Component {
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.fetchItems()
    }
    
    render(){
        const items = this.props;
        console.log('items', items)
        return (
        <div>
            <h1>Rendering All Items..</h1>
            {/* {this.props}  */}
        </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state, ownProps) => {
  return {
    items: state.item.allItems
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
