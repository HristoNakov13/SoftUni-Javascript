const dbPath = "../repository/database";

let database = require(dbPath);
const fs = require("fs");
const path = require("path");



function writeFile(newData, cubeData) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${__basedir}/repository/database.json`, JSON.stringify(newData, null, 2), (err) => {
            if (err) {
                console.log("pedal lol");
                reject(err);
                return;
            }

            database = newData;
            resolve(cubeData);
        });
    });
}

function save(cube) {
    if (containsCube(cube.id)) {
       return update(cube);
    }

    cube.id = database.currentId + 1;
    const newData = {
        "currentId": cube.id,
        "entities": database.entities.concat(cube)
    }

    return writeFile(newData, cube);
}

function update(cube) {
    const cubeIndex = database.entities.findIndex(({id}) => id === cube.id);
    const newData = {
        "currentId": database.currentId,
        "entities": [
            ...database.entities.slice(0, cubeIndex),
            cube,
            ...database.entities.slice(cubeIndex + 1)
        ]
    };

    return writeFile(newData, cube);
}

function containsCube(cubeId) {
    return cubeId !== undefined && findByid(cubeId) !== undefined;
}

function findByid(cubeId) {
    return Promise.resolve(database.entities.find(({id}) => id === cubeId));
}

function findAll() {
    return Promise.resolve(database.entities);
}

module.exports = {
    save,
    findByid,
    findAll
};