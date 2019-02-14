[![version](https://img.shields.io/npm/v/rollup-plugin-modify.svg)]()  [![license](https://img.shields.io/github/license/porsager/rollup-plugin-modify.svg)]()

# 🔎 `rollup-plugin-modify`

Modify rollup output with find / replace dynamically.

## Usage

```bash
npm i rollup-plugin-modify
```

Explicit single using find, replace keys
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

Terse multiple using key, value
```
import modify from 'rollup-plugin-modify'

export default {
  plugins: [
    modify({
      'find this text': 'replace with this here',
      'process.env.PORT': 5000
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

