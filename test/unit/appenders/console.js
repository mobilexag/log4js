/* eslint no-unused-expressions:0 no-console:0 */
/*  eslint-env mocha */

import { expect } from 'chai';
import ConsoleAppender from '../../../src/appenders/console';
import LogLevel from '../../../src/log-level';
import { getLogger } from '../../../src/index';
import LogEvent from '../../../src/log-event';
import ArrayLayout from '../../../src/layouts/array';
import { assert, sandbox as Sandbox } from 'sinon';

describe('Console Appender', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = Sandbox.create();

    sandbox.stub(console, 'log');
    sandbox.stub(console, 'warn');
    sandbox.stub(console, 'info');
    sandbox.stub(console, 'error');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('initialization', () => {
    const logger = getLogger('console');
    expect(logger).to.be.ok;

    const appender = ConsoleAppender.getInstance();
    expect(appender).to.be.ok;

    logger.addAppender(appender);
  });

  it('is singleton', () => {
    const firstConsoleAppender = ConsoleAppender.getInstance();
    const secondConsoleAppender = ConsoleAppender.getInstance();

    expect(firstConsoleAppender).to.equal(secondConsoleAppender);
  });

  it('debug logging', () => {
    const logger = getLogger('debug');
    const debug = 'My debug message';
    const formattedMessage = new ArrayLayout().format(
      new LogEvent('debug', LogLevel.DEBUG, debug, undefined, logger));

    logger.setLevel(LogLevel.DEBUG);
    logger.addAppender(ConsoleAppender.getInstance());

    logger.debug(debug);

    assert.notCalled(console.warn);
    assert.notCalled(console.info);
    assert.notCalled(console.error);
    assert.calledOnce(console.log);

    const logCall = console.log.getCall(0);

    logCall.args.forEach((argument, index) => {
      expect(argument).to.equal(formattedMessage[index]);
    });
  });

  it('debug not logging when level not low enough', () => {
    const logger = getLogger('debug');
    const debug = 'My debug message';

    logger.setLevel(LogLevel.INFO);
    logger.addAppender(ConsoleAppender.getInstance());

    logger.debug(debug);

    assert.notCalled(console.warn);
    assert.notCalled(console.info);
    assert.notCalled(console.error);
    assert.notCalled(console.log);
  });

  it('info logging', () => {
    const logger = getLogger('info');
    const info = 'What an info!';
    const formattedMessage = new ArrayLayout().format(
      new LogEvent('info', LogLevel.INFO, info, undefined, logger));

    logger.setLevel(LogLevel.INFO);
    logger.addAppender(ConsoleAppender.getInstance());

    logger.info(info);

    assert.calledOnce(console.info);
    assert.notCalled(console.error);
    assert.notCalled(console.warn);
    assert.notCalled(console.log);

    const logCall = console.info.getCall(0);

    logCall.args.forEach((argument, index) => {
      expect(argument).to.equal(formattedMessage[index]);
    });
  });

  it('info not logging when level not low enough', () => {
    const logger = getLogger('info');
    const info = 'What an info!';

    logger.setLevel(LogLevel.WARN);
    logger.addAppender(ConsoleAppender.getInstance());

    logger.info(info);

    assert.notCalled(console.info);
    assert.notCalled(console.error);
    assert.notCalled(console.warn);
    assert.notCalled(console.log);
  });

  it('warning logging', () => {
    const logger = getLogger('warning');
    const warning = 'What a warning!';
    const formattedMessage = new ArrayLayout().format(
      new LogEvent('warning', LogLevel.WARN, warning, undefined, logger));

    logger.setLevel(LogLevel.WARN);
    logger.addAppender(ConsoleAppender.getInstance());

    logger.warn(warning);

    assert.calledOnce(console.warn);
    assert.notCalled(console.error);
    assert.notCalled(console.info);
    assert.notCalled(console.log);

    const logCall = console.warn.getCall(0);
    const logMessage = logCall.args[0];

    logCall.args.forEach((argument, index) => {
      expect(argument).to.equal(formattedMessage[index]);
    });
  });

  it('warning not logging when level not low enough', () => {
    const logger = getLogger('warning');
    const warning = 'What a warning!';

    logger.setLevel(LogLevel.ERROR);
    logger.addAppender(ConsoleAppender.getInstance());

    logger.warn(warning);

    assert.notCalled(console.warn);
    assert.notCalled(console.error);
    assert.notCalled(console.info);
    assert.notCalled(console.log);
  });

  it('error logging', () => {
    const logger = getLogger('error');
    const error = 'Something went horribly wrong!';
    const formattedMessage = new ArrayLayout().format(
      new LogEvent('error', LogLevel.ERROR, error, undefined, logger));

    logger.setLevel(LogLevel.ERROR);
    logger.addAppender(ConsoleAppender.getInstance());

    logger.error(error);

    assert.notCalled(console.warn);
    assert.calledOnce(console.error);
    assert.notCalled(console.info);
    assert.notCalled(console.log);

    const logCall = console.error.getCall(0);

    logCall.args.forEach((argument, index) => {
      expect(argument).to.equal(formattedMessage[index]);
    });
  });

  it('error not logging when level not low enough', () => {
    const logger = getLogger('error');
    const error = 'Something went horribly wrong!';

    logger.setLevel(LogLevel.FATAL);
    logger.addAppender(ConsoleAppender.getInstance());

    logger.error(error);

    assert.notCalled(console.warn);
    assert.notCalled(console.error);
    assert.notCalled(console.info);
    assert.notCalled(console.log);
  });
});
