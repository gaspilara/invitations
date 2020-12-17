// import { isBetween } from 'ngx-bootstrap/chronos/utils/date-compare';

export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function toString(value: any): string {
  return (value !== undefined && value !== null) ? `${value}` : '';
}

export function getValueInRange(value: number, max: number, min = 0): number {
  return Math.max(Math.min(value, max), min);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

export function isInteger(value: any): value is number {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}

export function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

export function regExpEscape(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function hasClassName(element: any, className: string): boolean {
  return element && element.className && element.className.split &&
      element.className.split(/\s+/).indexOf(className) >= 0;
}

export function parseToday() {
  var date = new Date();
  return { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()};
}

export function minDate() {
  return { day: 1, month: 1, year: 1900};
}

export function convertStringToNGBDate(ngbDate: string) {//fromat "DD/MM/YYYY"
  if (ngbDate) {
    const date = ngbDate.split('/');
    if ( !(!date[0] || !date[1] || !date[2] || date[2].length<4) && (Number(date[2]) < 2099 && Number(date[2]) > 1900 && Number(date[1]) <= 12 && Number(date[1]) > 0 && Number(date[0]) <= 31 && Number(date[0]) > 0)) {
      const newDate = new Date(Number(date[2]), Number(date[1])-1, Number(date[0]));
      return { day: newDate.getUTCDate(), month: newDate.getUTCMonth() + 1, year: newDate.getUTCFullYear()};
    }
  }
  return null;
}

export function parseDateToNGBDate(date: Date) {
  return date ? { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear()} : null;
}

export function convertStringToDate(ngbDate: string) {//fromat "DD/MM/YYYY"
  if (ngbDate) {
    const date = ngbDate.split('/');
    if ( !(!date[0] || !date[1] || !date[2] || date[2].length<4) && (Number(date[2]) < 2099 && Number(date[2]) > 1900 && Number(date[1]) <= 12 && Number(date[1]) > 0 && Number(date[0]) <= 31 && Number(date[0]) > 0)) {
      return new Date(Number(date[2]), Number(date[1])-1, Number(date[0]));
    }
  }
  return null;
}

export function convertNGBDateToDate(date: any) {
  return date ? new Date(date.year, date.month-1, date.day) : null;
}

export function truncateToDecimals(num: any) {
  //replace the 2 for de decimal value you want
  return num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
}

export function truncateTo4Decimals(num: any) {
  return num.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0]
}

export function validateDate(ngbDate: Date, min: Date, max: Date) {
  if (ngbDate !== null) {
    if (min !== null && max !== null && ngbDate.getTime() >= min.getTime() && ngbDate.getTime() <= max.getTime()) {
      return ngbDate;
    }
    if (min === null && max !== null && ngbDate.getTime() <= max.getTime()) {
      return ngbDate;
    }
    if (min !== null && max === null && ngbDate.getTime() >= min.getTime()) {
      return ngbDate;
    }
    if (min === null && max === null) {
      return ngbDate;
    }
  } 
  return null;
}

export function scrollTo(id: string): void {
  const element = document.getElementById(id) as HTMLElement
  element.scrollIntoView({ behavior: 'smooth' });
}

export function scrollTop(): void {
  window.scrollTo(0, 0);
}

export function scrollBottom(): void {
  window.scrollTo(0,document.body.scrollHeight);
}