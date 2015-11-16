
import test from 'ava'
import 'babel-core/register'
import { getUserEnv, getSystemEnv } from '../src'
import { find, identical } from 'ramda'

test('get user env variables', t => testEnv(t, getUserEnv))

test('get system env variables', t => testEnv(t, getSystemEnv))

function testEnv (t, getEnv) {
  return getEnv()
  .then((registry) => {
    console.log(registry)
    t.ok(findKey('TEMP', registry))
  })
}

function findKey (key, registry) {
  return find(
    ({ name }) => identical(key, name),
    registry
  )
}
