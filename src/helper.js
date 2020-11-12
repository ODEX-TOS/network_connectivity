// Find the amount of user from the NetworkManager requests
// Each day 280 calls get made per host
// Most devices usually run for less than a day (laptops for half a day)
// Looking at the stats we average around 170 calls per day
function users(amount) {
    return Math.ceil(amount / 170) || 1;
}

function users_from_arr(arr){
    let res = arr.map((x) => {
        users(parseInt(x,10))
    });
    return res;
}



module.exports = {
    users,
    users_from_arr
}