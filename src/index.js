
import { exec as _exec } from 'child_process'
import { join as join } from 'path'

import splitEvery from 'ramda/src/splitEvery'
import split from 'ramda/src/split'
import pipe from 'ramda/src/pipe'
import map from 'ramda/src/map'
import remove from 'ramda/src/remove'

const keys = {
  user: join('HKEY_CURRENT_USER', 'Environment'),

  system: join(
    'HKEY_LOCAL_MACHINE',
    'SYSTEM',
    'CurrentControlSet',
    'Control',
    'Session Manager',
    'Environment'
  )
}

function exec (command) {
  return new Promise((resolve, reject) => {
    _exec(command, (err, stdout, stderr) => {
      if (err) reject(err)
      resolve({ stdout, stderr })
    })
  })
}

function queryRegistry (key) {
  return exec(`reg query "${key}"`)
}

function parseRegistry (str) {
  return pipe(
    // split individual parts
    split(generateSpaces(4)),

    // remove title from text
    remove(0, 1),

    // generate keysets with [key, type, path]
    splitEvery(3),

    // map keysets to object literal { key, type, path}
    map(key => ({
      name: key[0].trim(),
      type: key[1].trim(),
      path: key[2].trim()
    }))
  )(str)
}

function generateSpaces (times) {
  return (new Array(times)).join(' ')
}

function getEnv (key) {
  return queryRegistry(key).then(({ stdout, stderr }) => parseRegistry(stdout))
}

function getUserEnv () {
  return getEnv(keys.user)
}

function getSystemEnv () {
  return getEnv(keys.system)
}

export default {
  parseRegistry,
  queryRegistry,
  getSystemEnv,
  getUserEnv,
  keys
}
