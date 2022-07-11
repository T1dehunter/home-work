import {DataSet} from './data-set.js';
import {Tree} from './tree.js';

const t = new Tree();

t.insert({key: 10});
t.insert({key: 20});
t.insert({key: 30});
t.insert({key: 5});
t.insert({key: 4});
t.insert({key: 2});
/*
* bst.insertNode(10)
    bst.insertNode(20)
    bst.insertNode(30)
    bst.insertNode(5)
    bst.insertNode(4)
    bst.insertNode(2)

    bst.print_tree()

    print("\nAfter deleting an element")
    bst.delete_node(2)
    bst.print_tree()
* */
// for (let i = 1; i < 20; i++) {
//     t.insert({ key: i });
// }
//
// t.printTree();
//
// for (let i = 1; i < 20; i++) {
//     if (i % 3 === 0) {
//         t.deleteNode(i);
//     }
// }

t.printTree();

t.deleteNode(2);

t.printTree();

const data = DataSet.generate(100);

const getRandomItemFromArray = (arr) => {
    const item = arr[Math.floor(Math.random() * arr.length)];
    return item;
};


const insertMeasurements = [];
for (let i = 0; i < data.length; i++) {
    const listItems = data[i];
    const tree = new Tree();

    for (let k = 0; k < listItems.length; k++) {
        const value = listItems[k];
        tree.insert({key: value});
    }

    const measurement = () => {
        const randomValue = getRandomItemFromArray(listItems);

        const start = performance.now();

        tree.insert({key: randomValue});

        const end = performance.now();

        const executionTime = end - start;

        // console.log("DEBUG DATA: ", {listItemsLength: listItems.length, randomValue, start, end, res: executionTime});

        return executionTime;
    };

    insertMeasurements.push(measurement);
}

for (let i = 0; i < insertMeasurements.length; i++) {
    console.log(`INSERT MEASUREMENT ${i + 1} TEST: `, insertMeasurements[i]());
}
