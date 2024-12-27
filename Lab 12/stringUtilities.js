// stringUtilities.js
const _ = require('lodash');

function capitalizeWords(sentence) {
    return _.startCase(_.toLower(sentence));
}

module.exports = { capitalizeWords };
