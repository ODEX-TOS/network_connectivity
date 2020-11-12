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
    client.get(key, callback);

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
    client.set(key, value, callback);
}

module.exports = {
    get,
    inc,
    set
}

