import * as core from '@actions/core'
import {inspect} from 'util'
import {getOctokit} from '@actions/github'
import {OctokitResponse} from '@octokit/types'

interface Inputs {
    token: string
    repository: string
    commentId: number
}

async function deleteComment(
    inputs: Inputs
): Promise<OctokitResponse<never, 204>> {
    const octokit = getOctokit(inputs.token)
    const [owner, repo] = inputs.repository.split('/')
    const body = {
        owner,
        repo,
        comment_id: inputs.commentId
    }
    core.info(`Calling delete comment ${body}`)
    return await octokit.rest.issues.deleteComment(body)
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

        await deleteComment(inputs)
        core.setOutput('done', true)
    } catch (error: any) {
        core.debug(inspect(error))
        core.setFailed(error.message)
    }
}

run()
