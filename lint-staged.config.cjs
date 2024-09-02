const micromatch = require('micromatch')

module.exports = {
  '*': (allFiles) => {
    const commands = []

    // Type check TypeScript files
    const typeScriptFiles = micromatch(allFiles, ['**/*.ts?(x)'], {})
    if (typeScriptFiles.length > 0) {
      commands.push('tsc -p tsconfig.json --noEmit')
    }

    // Lint and format TypeScript and JavaScript files.
    const codeFiles = micromatch(allFiles, ['**/*.[jt]s?(x)'], {})
    if (codeFiles.length > 0) {
      commands.push(
        `prettier --ignore-path .gitignore --write --list-different ${codeFiles.join(
          ' '
        )}`
      )
      commands.push(
        `eslint --cache --cache-location ./node_modules/.cache/eslint --fix ${codeFiles.join(
          ' '
        )}`
      )
    }

    // Format and lint CSS files.
    const cssFiles = micromatch(allFiles, ['**/*.css'], {})
    if (cssFiles.length > 0) {
      commands.push(
        `prettier --ignore-path .gitignore --write --list-different ${cssFiles.join(
          ' '
        )}`
      )
      commands.push(
        `stylelint ${cssFiles.join(
          ' '
        )} --cache --cache-location ./node_modules/.cache/stylelint --fix --allow-empty-input`
      )
    }

    // Format MarkDown and JSON files.
    const miscFiles = micromatch(allFiles, ['**/*.md', '**/*.json'], {})
    if (miscFiles.length > 0) {
      commands.push(
        `prettier --ignore-path .gitignore --write ${miscFiles.join(' ')}`
      )
    }

    return commands
  },
}
