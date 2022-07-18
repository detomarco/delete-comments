# Delete Comments
[![CodeQL](https://github.com/detomarco/delete-comment/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/detomarco/delete-comment/actions/workflows/codeql-analysis.yml)

A GitHub action to delete an issue or pull request comment.

## Usage

### Delete a comment to an issue or pull request

```yml
      - name: Delete comment
        uses: detomarco/delete-comment@v1
        with:
          token: ${GITHUB_TOKEN}
          repository: owner/repo
          comment-id: 231314915
```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `token` | `GITHUB_TOKEN` (`issues: write`, `pull-requests: write`) or a `repo` scoped [PAT](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). | `GITHUB_TOKEN` |
| `repository` | The full name of the repository in which to create or update a comment. | Current repository |
| `comment-id` | The id of the comment to update. | |

#### Outputs

| Name | Description |
| --- | --- |
| `done` | true when completed successfully |

### Where to find the id of a comment
I recommend this github action [Find Comment](https://github.com/peter-evans/find-comment)

## License

[MIT](LICENSE)
