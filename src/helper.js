const isoCountries = require("./countries.js").countries;

// update the graph every hour
const updateInMs = 60 * 60 * 1000;

// how many datapoints equal one day
const dailyLength = 24;

// the length of the graph to hold
// we save the last 2 days
const length = 2 * dailyLength;

// Find the amount of user from the NetworkManager requests
// Each day 280 calls get made per host
// Most devices usually run for less than a day (laptops for half a day)
// Looking at the stats we average around 170 calls per day
// the begin option is the amount of connections one day ago
// this way we know how many connections happened
function users(amount, begin) {
    if(begin == undefined || begin < 0)
        begin = 0;
    let dailyConnections = amount - begin;
    return Math.ceil(dailyConnections / 170) || 1;
}

function users_from_arr(arr){
    let res = arr.map((x, index) => {
        let dayAgo = arr[index - dailyLength] || 0;
        return users(x, dayAgo)
    });
    return res;
}

function getCountryName (countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}


module.exports = {
    users,
    users_from_arr,
    updateInMs,
    length,
    dailyLength,
    getCountryName
}
