/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
const dayjs = require('dayjs');
const isoWeek = require('dayjs/plugin/isoWeek');
const localeData = require('dayjs/plugin/localeData');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const updateLocale = require('dayjs/plugin/updateLocale');
const utc = require('dayjs/plugin/utc');
const isBetween = require('dayjs/plugin/isBetween');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.extend(isoWeek);
dayjs.extend(isSameOrAfter);

const formatDate = (date) => dayjs(date).format('YYYY-MM-DD');
const todayDate = () => dayjs().format('YYYY-MM-DD');
const differenceInDays = (expiryDate) => dayjs(formatDate(expiryDate)).diff(todayDate(), 'days');
const expiryDate = () => dayjs().add(90, 'day').format();

const todayDateInLocalTimeZone = () => dayjs().format();

const convertUTCtoLocalTime = (date) => dayjs.utc(date.substring(0, 23));

module.exports = {
  differenceInDays,
  expiryDate,
  formatDate,
  dayjs,
  todayDateInLocalTimeZone,
  convertUTCtoLocalTime,
  todayDate,
};
