function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

export default numberWithCommas;

export function formatAmount (x) {
  return x && Math.abs(x.toFixed(2));
} 

export function numberValid(x) {
  return /^(\d+|\d{1,3}(\.\d{3})*)(,\d{1,2})?$/.test(x);
}

export function emailValid(x) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
}

export function numberCalc(x) {
  return Number(x.replace(/\./g, '').replace(/,/, '.'));
}

export function formatDate(date) {
  const d = new Date(date);
  let month = `${  d.getMonth() + 1}`;
  let day = `${  d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) 
      month = `0${  month}`;
  if (day.length < 2) 
      day = `0${  day}`;

  return [day, month, year].join('/');
}