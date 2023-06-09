import { format, getTime, formatDistanceToNow } from 'date-fns';
import ja from 'date-fns/locale/ja';

// ----------------------------------------------------------------------

export function fDate(date: Date | string | number) {
  return format(new Date(date), 'PPP', { locale: ja });
}

export function fDateTime(date: Date | string | number) {
  return format(new Date(date), 'PPP pp', { locale: ja });
}

export function fTimestamp(date: Date | string | number) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: Date | string | number) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
