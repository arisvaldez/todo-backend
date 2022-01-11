const Task = require('./task');
require('colors');

class Tasks {
  _list = {};

  get arrList() {
    const list = [];

    Object.keys(this._list).forEach((key) => {
      list.push(this._list[key]);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  loadTasksFromArray(tasks) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(description) {
    const task = new Task(description);

    this._list[task.id] = task;
  }

  showAll() {
    console.log();
    this.arrList.forEach((task, index) => {
      const idx = `${index + 1}`.green;
      const status = task.completedAt ? 'Completed'.green : 'Pending'.red;
      console.log(`${idx}.- ${task.description} :: ${status}`);
      console.log();
    });
  }

  deleteTask(id) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  showCompletedOrPending(completed = true) {
    console.log();
    let idx = 0;

    this.arrList.forEach((task) => {
      const { completedAt, description } = task;
      idx += 1;
      const indexs = `${idx}`.green;
      const status = task.completedAt ? 'Completed'.green : 'Pending'.red;

      if (completed && completedAt) {
        console.log(
          `${indexs}.- ${description} :: ${status} :: ${completedAt}`
        );
      }

      if (!completed && !completedAt) {
        console.log(`${indexs}.- ${description} :: ${status}`);
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];

      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });

    this.arrList.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }
}

module.exports = Tasks;
