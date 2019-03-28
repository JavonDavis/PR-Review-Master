/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Application} app
 */
module.exports = app => {
  // Your code here
  app.log('Yay, the app was loaded!')

  app.on('*', async context => {
    context.log({ event: context.event, action: context.payload.action })
  })

  // to test: node_modules/.bin/probot receive -e issues -p test/fixtures/issues.opened.json ./index.js
  app.on('issues.opened', async context => {
    const issueComment = context.issue({ body: 'Thanks for opening the issue' })
    return context.github.issues.createComment(issueComment)
  })

  app.on('pull_request_review.submitted', async context => {
    const prComment = context.issue({ body: 'Thanks for creating the PR' })
    return context.github.issues.createComment(prComment)
  })
}
