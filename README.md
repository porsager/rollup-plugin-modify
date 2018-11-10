[![version](https://img.shields.io/npm/v/rollup-plugin-modify.svg)]()  [![license](https://img.shields.io/github/license/porsager/rollup-plugin-modify.svg)]()

# 🔎 `rollup-plugin-modify`

Modify rollup output with find / replace dynamically.

## Usage

```bash
npm i rollup-plugin-modify
```

```js
import modify from 'rollup-plugin-modify'

export default {
  plugins: [
    modify({
      find: String | RegExp,
      replace: String | Function
    })
  ]
}
```

### `find: String|RegExp`

Supply a string or RegExp to find what you are looking for

### `replace: String|Function`

Supply a string to directly replace what you've found, or a function to dynamically modify your findings

#### Example using String for both find and replace

```js
modify({
  find: 'eval',
  replace: 'lava'
})
```

#### Example using RegExp for find and a Function for replace

```js
modify({
  find: /svg\((.*?)\)/,
  replace: (match, path) => JSON.stringify(fs.readFileSync(path, 'utf8'))
})
```
