require('colors');
const {
  inquirerMenu,
  pauseMenu,
  inputRead,
  selectTaskForDelete,
  confirm,
  showListChecklist,
} = require('./helpers/inquirer');
const Tasks = require('./model/tasks');
const { saveData, readData } = require('./helpers/dbHelper');

console.clear();

const main = async () => {
  const tasks = new Tasks();
  const tasksArray = readData();

  if (tasksArray) {
    tasks.loadTasksFromArray(tasksArray);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const description = await inputRead('Description: ');
        tasks.createTask(description);
        break;
      case '2':
        tasks.showAll();
        break;
      case '3':
        tasks.showCompletedOrPending();
        break;
      case '4':
        tasks.showCompletedOrPending(false);
        break;
      case '5':
        const ids = await showListChecklist(tasks.arrList);
        tasks.toggleCompleted(ids);
        break;
      case '6':
        const id = await selectTaskForDelete(tasks.arrList);
        if (id) {
          continue;
        }
        const ok = await confirm('Are you sure?');
        if (ok) {
          tasks.deleteTask(id);
          console.log('The task was deleted!');
        }
        break;

      default:
        break;
    }

    saveData(tasks.arrList);

    await pauseMenu();
  } while (opt !== '0');
};

main();
