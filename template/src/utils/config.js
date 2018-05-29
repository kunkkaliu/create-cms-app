/**
 * Created by liudonghui on 2018/3/22.
 */
import moment from 'moment';
import { getDay } from 'utils';

const dateFormat = 'YYYY-MM-DD';
const today = getDay(0);
const todayMoment = [moment(today, dateFormat), moment(today, dateFormat)];

const momentToString = (momentDate) => {
    const start = (momentDate && momentDate.length > 0 && momentDate[0] && momentDate[0].format(dateFormat)) || '';
    const end = (momentDate && momentDate.length > 1 && momentDate[1] && momentDate[1].format(dateFormat)) || '';
    return [start, end];
};

export default {
    momentToString,
    page: 1,
    pageSize: 10,
    selectStyle: {
        width: '100%',
    },
    today: todayMoment,
};
