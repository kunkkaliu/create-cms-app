/**
 * Created by liudonghui on 17/9/9.
 */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AppTest } from '../../src/views/App/index.jsx';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
let props;

beforeEach( () => {
    props = {
        httpLength: 1,
        route: {},
    };
    wrapper = shallow (
        <AppTest {...props}/>
    );
});

describe('App Component', () => {
    test('should render self and subcomponents', ()=> {
        expect(wrapper.find('.app').exists()).toBeTruthy();
        expect(wrapper.find('Footer').exists()).toBeTruthy();
        expect(wrapper.find('Loading').exists()).toBeTruthy();
        const loadingProps = wrapper.find('Loading').props();
        expect(loadingProps.loading).toBe(true);
    })
})