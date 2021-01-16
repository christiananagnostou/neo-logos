export const timeConverter = (UNIX_timestamp) => {
  var s = new Date(UNIX_timestamp).toLocaleDateString("en-US");
  return s;
};

export const getTimePassed = (unixTime) => {
  const ms = Date.now() - unixTime;
  const sec = Math.round(ms / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  const year = Math.floor(day / 365);
  if (sec < 60) {
    return `${sec} seconds ago`;
  }
  if ((min < 60) & (min > 0)) {
    return `${min} minutes ago`;
  }
  if ((hour < 24) & (hour > 0)) {
    return `${hour} hours ago`;
  }
  if ((day < 365) & (day > 0)) {
    return `${day} days ago`;
  }
  if (year > 0) {
    return `${year} years ago`;
  }
};
