const GitHub = require('github-api')
const Repository = GitHub.Repository

class PRWebhook {
  constructor(userName, repositoryName, accessToken) {
    this.__userName = userName
    this.__repositoryName = repositoryName
    this.__accessToken = accessToken
  }

  warn(number) {
    const gh = new GitHub({
      token: this.__accessToken
    })

    const repo = gh.getRepo(this.__userName, this.__repositoryName)
    repo.listPullRequestFiles(15).then((prs) => {
      if (prs.data.some((pr) => { return pr.filename === 'browser/main/Detail/MarkdownNoteDetail.js' })) {
        const iss = gh.getIssues(this.__userName, this.__repositoryName)
        iss.createIssueComment(15, "@asmsuechan I'm happy! I'm happy!")
      }
    })
  }
}

module.exports = PRWebhook
