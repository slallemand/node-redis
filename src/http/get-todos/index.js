const { http } = require('@architect/functions')
const createConnectedClient = require('@architect/shared/redis-client')

function convert(data) {
  return Object.entries(data).map(([key, value]) => ({ _id: key, ...JSON.parse(value) }))
}

exports.handler = http.async(read)

async function read(req) {
  const client = await createConnectedClient()

  let todos = await client.hGetAll('todos')

  await client.quit()

  return {
    statusCode: 200,
    cacheControl: 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
    json: convert(todos)
  }
}
