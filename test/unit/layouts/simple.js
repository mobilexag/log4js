/* eslint no-unused-expressions:0 */
/*  eslint-env mocha */

import { expect } from 'chai';
import { SIMPLE_LOG_FORMAT } from '../../../src/date-formatter';
import LogLevel from '../../../src/log-level';
import { getLogger } from '../../../src/index';
import LogEvent from '../../../src/log-event';
import SimpleLayout from '../../../src/layouts/simple';

describe('SimpleLayout', () => {
  const simpleLogDateRegex = /\d\d\d\d\.\d\d\.\d\d-\d\d:\d\d:\d\d/;

  it('interface', () => {
    const logger = getLogger('test');
    const layout = new SimpleLayout();
    const message = layout.format(
      new LogEvent('test', LogLevel.DEBUG, 'message', 'exception', logger));
    expect(message).to.be.ok;
  });

  it('structure', () => {
    const layout = new SimpleLayout();
    const error = new Error('exception');
    const message = layout.format(
      new LogEvent('test', LogLevel.DEBUG, ['message', error]));

    const messageDate = message.substring(0, SIMPLE_LOG_FORMAT.length);
    const messageRest = message.substring(SIMPLE_LOG_FORMAT.length);

    expect(messageDate).to.match(simpleLogDateRegex);

    const cache = [];
    const errorRepresentation = JSON.stringify(error, (key, value) => {
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
    expect(messageRest).to.equal(` - DEBUG - test - message\n${errorRepresentation}\n`);
  });
});
