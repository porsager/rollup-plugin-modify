import type { Plugin } from 'rollup'

type ReplaceFunction = (match: string, path: string) => string

interface RollupModifyOptions {
  [key: string]:
    | RollupModifyOptions['find']
    | RollupModifyOptions['replace']
    | RollupModifyOptions['sourcemap']
  find: string | RegExp
  replace: string | ReplaceFunction
  sourcemap?: boolean
}

export default function modify(options: RollupModifyOptions): Plugin