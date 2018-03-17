/**
 * Created by liudonghui on 17/9/9.
 */
jest.mock('../../src/network');
import store from '../../src/store';
import reducer from '../../src/reducers/dashboard';
import * as actions from '../../src/actions/dashboard';

describe('dashboard reducer', () => {
    test('shoule return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            name: '',
            userInfo: {},
        })

        expect(reducer(undefined, undefined)).toEqual({
            name: '',
            userInfo: {},
        })
    })

    test('should handle CHANGENAME', () => {
        expect(reducer({
            name: '',
        }, actions.changeName('dhl'))).toEqual({
            name: 'dhl',
        })
    })

    test('should handle SUBMIT_SUCCESS', () => {
        return store.dispatch(actions.submit('dhl')).payload.promise.then(res => {
            const userInfo = (res.payload.data && res.payload.data.data) || {};
            expect({
                userInfo: userInfo
            }).toEqual({
                userInfo: {
                    name: 'dhl',
                    age: 29,
                    nickname: '天下第一帅',
                },
            })
        })
    })

    // test('should handle SUBMIT_SUCCESS', () => {
    //     return store.dispatch(actions.submit('ss')).payload.promise.then(res => {
    //         const userInfo = (res.payload.data && res.payload.data.data) || {};
    //         expect({
    //             userInfo: userInfo
    //         }).toEqual({
    //             userInfo: {},
    //         })
    //     })
    // })
})