import * as core from '@actions/core'
import {inspect} from 'util'
import {getOctokit} from '@actions/github'

interface Inputs {
    token: string
    repository: string
    commentId: number
}

async function deleteComment(inputs: Inputs): Promise<boolean> {
    const [owner, repo] = inputs.repository.split('/')

    const body = {
        owner,
        repo,
        comment_id: inputs.commentId
    }
    core.debug(`Calling delete comment ${inspect(body)}`)

    const octokit = getOctokit(inputs.token)
    return octokit.rest.issues
        .deleteComment(body)
        .then(() => true)
        .catch(() => false)
}

async function run(): Promise<void> {
    core.debug(`Start delete comments`)
    const inputs: Inputs = {
        token: core.getInput('token'),
        repository: core.getInput('repository'),
        commentId: Number(core.getInput('comment-id'))
    }
    core.debug(`Inputs: ${inspect(inputs)}`)
    const result = await deleteComment(inputs)
    core.setOutput('done', result)
}

run()
