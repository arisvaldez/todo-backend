require("colors");

const showMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=====================".green);
    console.log("Select an option".green);
    console.log("=====================\n".green);

    console.log(`${"1".green}. Create task`);
    console.log(`${"2".green}. Listing task`);
    console.log(`${"3".green}. Listing completed task`);
    console.log(`${"4".green}. Listing pending task`);
    console.log(`${"5".green}. Mark checked complete task`);
    console.log(`${"6".green}. Delete task`);
    console.log(`${"0".green}. Close\n`);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Select an option ", (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`Press ${"Enter".green} for continue.`, (opt) => {
        readline.close();
        resolve();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
