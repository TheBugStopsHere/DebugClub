import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getItemsThunk} from '../store/item'

class AllItems extends Component {
  constructor() {
    super()
    this.createGrid = this.createGrid.bind(this)
  }

  componentDidMount() {
    this.props.fetchItems()
  }

  createGrid() {
    const {items} = this.props
    const numRows = Math.ceil(items.length / 3)
    let grid = []
    for (let i = 0; i < numRows; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
        let item = items[j + 3 * i]
        row.push(
          <div key={'td_' + i + '_' + j} class="col-md-4">
            <div id="linkToSingle">
              <Link to={`item/${item.id}`}>
                <h4>{item.name} </h4>
                <img
                  src={item.imageURL}
                  class="center-block img-rounded"
                  alt="Responsive image"
                  height={200}
                  width={300}
                />
              </Link>
            </div>
            <h4> {item.price} </h4>

            <button type="button" id="addToCard">
              {' '}
              Add To Cart{' '}
            </button>
          </div>
        )
      }
      grid.push(
        <div key={'tr_' + i} class="row">
          {row}
        </div>
      )
    }
    return grid
  }

  render() {
    return <div class="container-fluid">{this.createGrid()}</div>
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
