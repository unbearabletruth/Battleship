function arrayInArray(array, item){
    let strItem = JSON.stringify(item);
    let contains = (el) => JSON.stringify(el) === strItem;
    return array.some(contains);
}

/*[-1, -1]
[-1, 0]
[-1, 1]
[0, 1]
[1, 1]
[1, 0]
[1, -1]
[0, -1]*/
export {arrayInArray}