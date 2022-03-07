import dayjs from 'dayjs';
import dayjsFormat from './dayjsFormat.js';

export default function formatDate(array, property) {
  return array.forEach(
    (element) =>
      (element[property] = dayjs(element[property]).format(dayjsFormat))
  );
}
