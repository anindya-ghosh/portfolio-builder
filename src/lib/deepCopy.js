// this will not work if there is any function property.
// as in data there is no function property so it is good to go
let deepCopy = (ob) => JSON.parse(JSON.stringify(ob));

export { deepCopy };