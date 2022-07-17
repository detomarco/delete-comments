import * as core from '@actions/core'
import {Octokit} from "@octokit/rest";

import {inspect} from 'util'
import {OctokitResponse} from "@octokit/types";

interface Inputs {
    token: string
    repository: string
    commentId: number
}

async function deleteComment(octokit: Octokit, inputs: Inputs): Promise<OctokitResponse<never,  204>> {
    const [owner, repo] = inputs.repository.split('/')
    return await octokit.rest.issues.deleteComment({
        owner,
        repo,
        comment_id: inputs.commentId
    })
}

async function run(): Promise<void> {
    try {
        const inputs: Inputs = {
            token: core.getInput('token'),
            repository: core.getInput('repository'),
            commentId: Number(core.getInput('comment-id'))
        }
        core.debug(`Inputs: ${inspect(inputs)}`)

        const octokit = new Octokit({auth: inputs.token});
        await deleteComment(octokit, inputs)
        core.setOutput('done', true)

    } catch (error: any) {
        core.debug(inspect(error))
        core.setFailed(error.message)
    }
}

run()
