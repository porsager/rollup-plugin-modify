const MagicString = require('magic-string')

const escapeRegExp = x => x.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

module.exports = function modify({
  find,
  replace,
  sourcemap = true,
  ...rest
}) {
  const modifiers = [[find, replace], ...Object.entries(rest)]
    .filter(x => x[0])
    .map(([find, replace]) => [
      parseFind(find),
      replace
    ])

  return {
    name: 'modify',
    transform: (source, id) => {
      if (modifiers.every(x => !x[0].test(source)))
        return

      const s = new MagicString(source)

      modifiers.forEach(([find, replace]) => {
        find.lastIndex = 0
        let match
        while ((match = find.exec(source)) !== null) {
          s.overwrite(
            match.index,
            match.index + match[0].length,
            typeof replace === 'function'
              ? replace.apply(null, match)
              : String(replace)
          )
        }

        return s
      })

      return {
        code: s.toString(),
        map: sourcemap ? s.generateMap() : null
      }
    }
  }

  function parseFind(find) {
    if (find instanceof RegExp)
      return new RegExp(find, find.flags + (find.flags.includes('g') ? '' : 'g'))

    const regex = find.match(/^\/(.*)\/([yumgis]*)$/)
    return regex
      ? new RegExp(regex[1], regex[2] + (regex[2].includes('g') ? '' : 'g'))
      : new RegExp(escapeRegExp(find), 'g')
  }
}

