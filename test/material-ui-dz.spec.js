import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {expect} from 'chai';
import Dialog from 'material-ui/Dialog';
import MaterialDropZone from '../src/index';

Enzyme.configure({ adapter: new Adapter() });

describe('<MaterialDropZone />', () => {
    it('renders a <Dialog /> component', () => {
        const wrapper = Enzyme.shallow(<MaterialDropZone/>);
        expect(wrapper.find(Dialog)).to.have.length(1);
    });
});
