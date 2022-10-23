import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(relativeTime);

export const uniqueKey = () => nanoid(7);

export const todayDate = () => dayjs().local().format();
export const formatDateToString = (date) => dayjs(date).local().format('DD MMMM YYYY, HH:mm:ss');
export const formatDateToFromNow = (date) => dayjs(date).fromNow(false);
export const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');
