import React, {Component} from 'react'
import {connect} from 'react-redux'
import { getItemThunk } from '../store/item';
import {addDecimal, checkStock} from '../../script/util';


class SingleItem extends Component {

    componentDidMount(){
        this.props.fetchItem(this.props.match.params.itemId)
    }

    
    render(){

        const {item} = this.props
        console.log(item.inStock)
        return (
            <div>
                
                <div>
                    <h1>{item.name}</h1>
                    {item.price
                        ? <h1>${addDecimal(item.price)}</h1>
                        : null
                    }
                    <h1>THINGS ARE WORKING</h1>
                    <h1>{item.inStock}</h1>
                    {item.inStock
                        ? <h1>{checkStock(item.inStock)}</h1>
                        : null
                    }
                    
                    <img src={item.imageURL} height={500} width={800} />
                    <h4>Type: {item.category}</h4>
                    <p>{item.description}</p>
                </div>

                <button type='button' id='addToCard'> Add To Cart </button>

            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state, ownProps) => {
  return {
    item: state.item
  }
}

const mapDispatchToProps = {
    //Thunk to display an item from the selectedItem state. Takes an itemId as input to invoke the function.
    fetchItem: getItemThunk
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem)

/**
 * PROP TYPES
 */