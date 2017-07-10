"use strict"

const PORT = process.env.PORT || 8080
const SECRET = "mysecretkey" //設定した任意のキー
const REPOSITORY_NAME = "asmsuechan/Boostnote" //リポジトリ名

const http = require("http")
const createHandler = require("github-webhook-handler")
const handler = createHandler({
  path: "/",
  secret: SECRET
})


http.createServer((req, res) => {
  handler(req, res, (err) => {
    res.statusCode = 404
    res.end("no such location")
  })
}).listen(PORT)


handler.on("error", (err) => {
  console.error("Error:", err.message)
})


handler.on("push", (event) => {
  const payload = event.payload
  const repoName = payload.repository.name
  const branch = payload.ref.split("/").pop()

  if (repoName === REPOSITORY_NAME && branch === "master") {
    // デプロイ処理や更新通知など (Twitter,Slack,etc...)
  }
})
