//This tests the SingleItem component

import {expect} from 'chai'
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import React from 'react';
import {SingleItem} from '../../client/components/Single-Item';

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleItem', () => {
      let singleItem

      const item = { name: 'Grasshopper'} ;

      beforeEach(() => {
        singleItem = shallow(<SingleItem item={item} />)
      })

    it('renders the name in an h1', () => {
        expect(singleItem.find('h1').text()).to.be.equal('Grasshopper')
    })
}) 