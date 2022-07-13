// Javascript implementation of Counting Sort
export const sort = (arr) => {
    const max = Math.max.apply(Math, arr);
    const min = Math.min.apply(Math, arr);
    const range = max - min + 1;
    const count = Array.from({ length: range }, (_, i) => 0);
    const output = Array.from({ length: arr.length }, (_, i) => 0);

    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }

    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }

    console.log("COUNT ARR", count);

    return arr;
}
