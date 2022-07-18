import * as core from '@actions/core'
import {inspect} from 'util'
import {getOctokit} from '@actions/github'

interface Inputs {
    token: string
    repository: string
    commentId: number
}

async function deleteComment(inputs: Inputs): Promise<boolean> {
    const octokit = getOctokit(inputs.token)
    const [owner, repo] = inputs.repository.split('/')

    const body = {
        owner,
        repo,
        comment_id: inputs.commentId
    }
    core.info(`Calling delete comment ${inspect(body)}`)

    return octokit.rest.issues
        .deleteComment(body)
        .then(() => true)
        .catch(() => false)
}

async function run(): Promise<void> {
    core.info(`Start delete comments`)
    try {
        const inputs: Inputs = {
            token: core.getInput('token'),
            repository: core.getInput('repository'),
            commentId: Number(core.getInput('comment-id'))
        }
        core.info(`Inputs: ${inspect(inputs)}`)
        const result = await deleteComment(inputs)
        core.setOutput('done', result)
    } catch (error: any) {
        core.debug(inspect(error))
        core.setFailed(error.message)
    }
}

run()
