import React, {Component} from 'react'
import {Link} from 'react-router-dom';
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
        const {items} = this.props;
        return (
        <div>
            {items.map(function(item){
                return (
                    <div key={item.id}>

                        <div id='linkToSingle'>
                            <Link to={`item/${item.id}`} > 
                                <h4>{item.name} </h4>
                                <img src={item.imageURL} height={200} width={300} />
                            </Link>
                        </div>
                        <h4> {item.price} </h4>

                        <button type='button' id='addToCard'> Add To Cart </button>

                    </div>

                )
            })}
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
