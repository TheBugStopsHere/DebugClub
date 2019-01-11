import React, {Component} from 'react'
import {connect} from 'react-redux'
import { getItemThunk } from '../store/item';
import {addDecimal, stockToArr} from '../../script/util';


class SingleItem extends Component {

    componentDidMount(){
        this.props.fetchItem(this.props.match.params.itemId)
    }

    
    render(){

        const {item} = this.props
        return (
            <div>
                
                <div>
                    <h1>{item.name}</h1>
                    {item.price
                        ? <h1>${addDecimal(item.price)}</h1>
                        : null
                    }
                    
                    <img src={item.imageURL} height={500} width={800} />
                    {item.inStock<10 && item.inStock>0
                        ? <div id="buyNowWarning">
                            <h4>There are only {item.inStock} left in stock!</h4>
                        </div>
                        : null
                    }

                    <h4>Type: {item.category}</h4>
                    <p>{item.description}</p>
                </div>

                {item.inStock > 0
                        ? <div id='inStock'>
                            <label name="purchaseQuanity">Quantity</label>
                                <select name="purchaseQuanity">
                                    {stockToArr(item.inStock).map(function(num){
                                        return (
                                            <option key={num} value={num}> {num} </option>
                                        )
                                    })}
                                </select>
                        </div>
                        : <div id='outOfStock'>
                            <h4>This is is current out of stock</h4>
                        </div>
                }

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