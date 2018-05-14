/**
 * Created by liudonghui on 2018/3/22.
 */
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const nowDate = new Date();
const today = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
const todayMoment = [moment(today, dateFormat), moment(today, dateFormat)];

export default {
    page: 1,
    pageSize: 10,
    selectStyle: {
        width: '100%',
    },
    today: todayMoment,
};
