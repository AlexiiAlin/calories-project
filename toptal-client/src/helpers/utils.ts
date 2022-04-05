import moment from "moment";

export const checkUserType = (userContext, userType) => {
  return userContext && userContext.user && userContext.user.userType === userType;
}

export const dateIsBeforeNow = (date: string) => {
  return moment().diff(moment(date)) < 0;
}

export const isSameDay = (date1, date2) => {
  return moment(date1).startOf('day')
    .isSame(moment(date2).startOf('day'));
}

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const sanitiseObject = (obj) => {
  return Object.keys(obj)
    .reduce((acc, key) => {
      if (!isNullOrUndefined(obj[key])) {
        acc[key] = obj[key]
      }
      return acc;
    }, {});
}

export const isNullOrUndefined = (obj) => {
  return obj === null || obj === undefined;
}
