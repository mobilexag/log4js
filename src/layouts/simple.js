import { formatDate, SIMPLE_LOG_FORMAT } from '../date-formatter';
import Layout from '../layout';

function safeStringify(obj) {
  const cache = [];
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return undefined;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
}

// Simple string layout for a logging event which styles a log event
// in the following format:
//
//  yyyy.mm.dd-hh:MM:ss - LEVEL - CATEGORY - MESSAGE
//  EXCEPTION
// (new line after EXCEPTION)
export default class SimpleLayout extends Layout {
  constructor() {
    super();

    this.LINE_SEP = '\n';
  }

  format(loggingEvent) {
    let result = `${formatDate(loggingEvent.timestamp, SIMPLE_LOG_FORMAT)} - ${loggingEvent.level.toString()}` +
      ` - ${loggingEvent.categoryName} - `;
    if (Array.isArray(loggingEvent.args)) {
      for (const argument of loggingEvent.args) {
        let argumentString = argument;
        if (typeof argument === 'object') {
          argumentString = safeStringify(argument);
        }
        result = result + `${argumentString}` + this.LINE_SEP;
      }
    } else if (loggingEvent.args) {
      let argumentString = loggingEvent.args;
      if (typeof loggingEvent.args === 'object') {
        argumentString = safeStringify(loggingEvent.args);
      }
      result = result + `${argumentString}` + this.LINE_SEP;
    }
    return result;
  }

  getContentType() {
    return 'text/plain';
  }
}
