export default class LogEvent {
  // 'categoryName' is of the type 'string'
  // 'level' is of the type 'Level'
  // 'args' is an array or a single argument
  constructor(categoryName, level, args) {
    this.categoryName = categoryName;
    this.level = level;
    this.args = args;

    this.timestamp = new Date();
  }
}
