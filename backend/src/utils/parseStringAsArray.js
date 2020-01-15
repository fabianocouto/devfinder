module.exports =  function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(text => text.trim());
}