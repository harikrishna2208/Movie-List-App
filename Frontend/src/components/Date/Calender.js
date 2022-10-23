import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/lib/date-picker/generatePicker';

import 'antd/lib/calendar/style';

const Calendar = generatePicker(dayjsGenerateConfig);

export default Calendar;
