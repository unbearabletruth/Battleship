function arrayInArray(array, item){
    let item_as_string = JSON.stringify(item);
    let contains = array.some(function(element){
      return JSON.stringify(element) === item_as_string;
    });
    return contains;
  }

export {arrayInArray}