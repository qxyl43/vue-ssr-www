import moment from 'moment';

export const formatTime = (value, format) => moment(value).format(format);

export const toFixed = (value, point = 2) => value.toFixed(point);
