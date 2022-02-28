const { http } = require('@architect/functions')
const createConnectedClient = require('@architect/shared/redis-client')

exports.handler = http.async(destroy)

async function destroy(req) {
  const client = await createConnectedClient()

  let { key } = http.helpers.bodyParser(req)

  await client.hDel('todos', key)

  await client.quit()

  return {
    statusCode: 302,
    headers: {
      location: '/',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}
