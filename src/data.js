const redis = require("redis");
const client = redis.createClient({
    host:"redis",
    password:"sOmE_sEcUrE_pAsS"
});
 
client.on("error", function(error) {
  console.error(error);
  process.exit(-1);
});

function get(key, callback) {
    client.get(key, (err, value)  => {
        callback(err, JSON.parse(value));
    });

}

function inc(key, callback) {
    client.get(
        key,
        (_, reply) => {
            client.set(key, ++reply, callback);
        }
    );
}

function set(key, value, callback) {
    if (typeof value === 'string' || value instanceof String)
        client.set(key, value, callback);
    else
        client.set(key, JSON.stringify(value), callback);
}

// if the array is bigger then length chop off first n elements
function chop(arr, length) {
    if(arr.length < length)
        return arr;
    arr.splice(0, arr.length - length);
    return arr;
}

// add the value of key to the arr, save it in redis
// if the arr is bigger then limit, remove first element until limit
function add(arr, key, limit, callback){
    client.get(
        arr,
        (_, reply) => {
            // in case it doesn't exist we create an empty array
            let array = JSON.parse(reply);
            if(!Array.isArray(array))
                array = [...Array(limit)].map(x => 0);

            array = chop(array, limit-1);

            client.get(key, (_, value) => {
                array.push(parseInt(value, 10));
                set(arr, array, callback);
            })
        }
    )
}

module.exports = {
    get,
    inc,
    set,
    add
}

