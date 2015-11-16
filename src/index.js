
import { exec as _exec } from 'child_process'
import { join as join } from 'path'

import splitEvery from 'ramda/src/splitEvery'
import split from 'ramda/src/split'
import pipe from 'ramda/src/pipe'
import map from 'ramda/src/map'
import remove from 'ramda/src/remove'

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

/**
 * Gets all user environment variables
 * @return {Array} of environment variables as an object with signature `{ name, type, path }`
 */

function getUserEnv () {
  const key = join('HKEY_CURRENT_USER', 'Environment')
  return getEnv(key)
}

/**
 * Gets all system environment variables
 * @return {Array} of environment variables as an object with signature `{ name, type, path }`
 */

function getSystemEnv () {
  const key = join(
    'HKEY_LOCAL_MACHINE',
    'SYSTEM',
    'CurrentControlSet',
    'Control',
    'Session Manager',
    'Environment'
  )

  return getEnv(key)
}

export default {
  getUserEnv,
  getSystemEnv
}
