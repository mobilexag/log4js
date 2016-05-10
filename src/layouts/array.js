import { formatDate, SIMPLE_LOG_FORMAT } from '../date-formatter';
import Layout from '../layout';

// Returns an array that prepends all arguments with the current time, level and category
export default class ArrayLayout extends Layout {
  format(loggingEvent) {
    let results = [`${formatDate(loggingEvent.timestamp, SIMPLE_LOG_FORMAT)} - ${loggingEvent.level.toString()}` +
      ` - ${loggingEvent.categoryName}`];
    if (Array.isArray(loggingEvent.args)) {
      results = results.concat(loggingEvent.args);
    } else if (loggingEvent.args) {
      results = results.concat([loggingEvent.args]);
    }
    return results;
  }

  getContentType() {
    return 'array';
  }
}
