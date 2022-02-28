const redis = require('redis');

async function createConnectedClient() {
  const client = redis.createClient({
    url: process.env.REDIS_URL
  })
  client.on('connect', () => {
    console.log("connected to redis");
  })

  client.on("error", (error) => {
    console.error(error);
  });

  client.on("end", () => {
    console.log("dis-connected from redis");
  });

  client.connect()
  return client;
}

module.exports = createConnectedClient;
