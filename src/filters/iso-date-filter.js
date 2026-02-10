import moment from 'moment';

export default (value) => {
  const dateObject = moment(value).utc();
  return dateObject.format('YYYY-MM-DD');
};
