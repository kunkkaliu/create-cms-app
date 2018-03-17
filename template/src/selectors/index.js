/**
 * Created by liudonghui on 17/8/3.
 */
import {createSelector} from 'reselect';

const getAuthsByType = (auths, type) => auths.filter(item => type == item.perm_type);

// export const getAuths = createSelector([getAuthsByType], (auths) => {
//     debugger;
//     return auths;
// });

export const makeGetAuths = () => {
    return createSelector([getAuthsByType], (auths) => {
        return auths;
    });
}