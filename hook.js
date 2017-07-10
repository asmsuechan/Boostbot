'use strict'

const PORT = process.env.PORT || 8080
const SECRET = 'mysecretkey'
const REPOSITORY_NAME = 'asmsuechan/Boostnote'

const http = require('http')
const createHandler = require('github-webhook-handler')
const GitHub = require('github-api')
const PRWebhook = require('./PRWebhook')

const handler = createHandler({
  path: '/',
  secret: SECRET
})

http.createServer((req, res) => {
  handler(req, res, (err) => {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(PORT)

handler.on('error', (err) => {
  console.error('Error:', err.message)
})

handler.on('push', (event) => {
  const payload = event.payload
  const repoName = payload.repository.name
  const branch = payload.ref.split('/').pop()

  if (repoName === REPOSITORY_NAME && branch === 'master') {
  }
})

handler.on('pull_request', (event) => {
  const userName = 'asmsuechan'
  const repositoryName = 'Boostnote'
  const accessToken = ''

  if (event.payload.action !== 'opend') return
  const webhook = new PRWebhook(userName, repositoryName, accessToken)
  webhook.warn(event.payload.number)
})
