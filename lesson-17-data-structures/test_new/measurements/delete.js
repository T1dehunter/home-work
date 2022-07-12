import fs from 'fs';

import {DataSet} from '../data-set.js';
import {Tree} from '../tree.js';
import {getRandomItemFromArray} from './utils.js';

const data = DataSet.generate(100);

const results = [];

for (let i = 0; i < data.length; i++) {
    const listItems = data[i];
    const tree = new Tree();

    for (let k = 0; k < listItems.length; k++) {
        const value = listItems[k];
        tree.insert({key: value});
    }

    const randomValue = getRandomItemFromArray(listItems);

    const start = performance.now();

    tree.deleteNode({key: randomValue});

    const end = performance.now();

    const executionTime = end - start;

    results.push(executionTime);
}

fs.writeFileSync('./testDelete.json', JSON.stringify(results));
