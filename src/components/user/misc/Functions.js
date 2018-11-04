
//Will indicate if an object already exists in an array, if it exists, it returns the position
function arrayContainsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            return i;
        }
    }

    return null;
}

export { arrayContainsObject };