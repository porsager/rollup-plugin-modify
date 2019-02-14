const o = require('ospec')
    , m = require('../index.js')

o('find replace string', () => {
  const result = m({
    find: 'this',
    replace: 'that'
  }).transform('replace this here')

  o(result.code).equals('replace that here')
})

o('find replace regex', () => {
  const result = m({
    find: /this/m,
    replace: 'that'
  }).transform('replace this here this there')

  o(result.code).equals('replace that here that there')
})

o('find replace regex function', () => {
  const result = m({
    find: /this/,
    replace: (m) => m.split('').reverse().join('')
  }).transform('replace this here this there')

  o(result.code).equals('replace siht here siht there')
})

o('key, value', () => {
  const result = m({
    wat: 'woot'
  }).transform('say wat?')

  o(result.code).equals('say woot?')
})

o('multiple key, value sets', () => {
  const result = m({
    wat: 'woot',
    say: 'think',
    'process.env.PORT': 5000
  }).transform('say wat, process.env.PORT?')

  o(result.code).equals('think woot, 5000?')
})

o('regex custom keys', () => {
  const result = m({
    '/.a./': 'woot'
  }).transform('say wat?')

  o(result.code).equals('woot woot?')
})
