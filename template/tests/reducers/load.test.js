/**
 * Created by liudonghui on 17/9/8.
 */
import reducer from '../../src/reducers/load';
import * as actions from '../../src/actions/load';

describe('load reducer', () => {
    test('shoule return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            httpLength: 0,
        })
        expect(reducer(undefined, undefined)).toEqual({
            httpLength: 0,
        })
    })

    test('should handle ADDHTTPLOAD', () => {
        expect(reducer({
            httpLength: 1,
        }, actions.addHttpLoadLength())).toEqual({
            httpLength: 2,
        })
    })

    test('should handle DELHTTPLOAD', () => {
        expect(reducer({
            httpLength: 1,
        }, actions.delHttpLoadLength())).toEqual({
            httpLength: 0,
        })
    })
})