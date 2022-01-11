const fs = require('fs');

const file = './db/data.json';

const saveData = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

const readData = () => {
    if (!fs.existsSync(file)) {
        return null;
    }

    const data = fs.readFileSync(file, { encoding: 'utf-8' });
    const dataArr = JSON.parse(data);

    return dataArr;
}

module.exports = {
    saveData,
    readData
}
