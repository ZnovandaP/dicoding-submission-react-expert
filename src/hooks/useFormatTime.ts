import moment from 'moment';
import 'moment/locale/id';

export const useParseTimeToNow = () => (time: string) => moment(time).fromNow();

export const useFormatDate = () => (time: string) => moment(time).format('LLL');
