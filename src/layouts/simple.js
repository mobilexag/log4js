import DateFormatter from '../date-formatter';
import Layout from '../layout';

class SimpleLayout extends Layout {
  constructor() {
    super();

    this.LINE_SEP = '\n';
    this.LINE_SEP_LEN = 1;

    this.format = this.format.bind(this);
    this.getSeparator = this.getSeparator.bind(this);
  }

  format(loggingEvent) {
    return `${DateFormatter.formatDate(new Date(), DateFormatter.SIMPLE_LOG_FORMAT)} - ${loggingEvent.level.toString()}` +
      ` - ${loggingEvent.categoryName} - ${loggingEvent.message}${this.LINE_SEP}` +
      `${loggingEvent.exception ? loggingEvent.exception + this.LINE_SEP : ''}`;
  }

  getHeader() {
    return '';
  }

  getFooter() {
    return '';
  }

  getSeparator() {
    return this.LINE_SEP;
  }
}

export default SimpleLayout;
