
import test from 'ava'
import 'babel-core/register'
import { getUserEnv, getSystemEnv, parseRegistry } from '../src'
import { find, identical } from 'ramda'
import { platform } from 'os'

test('parse registry', t => testEnv(t, mockRegistry))

if (isWindows()) {
  test('get user env variables', t => testEnv(t, getUserEnv))
  test('get system env variables', t => testEnv(t, getSystemEnv))
}

function testEnv (t, getEnv) {
  return getEnv()
  .then((registry) => {
    t.ok(findKey('TEMP', registry))
  })
}

function findKey (key, registry) {
  return find(
    ({ name }) => identical(key, name),
    registry
  )
}

function mockRegistry () {
  const str = `
  HKEY_CURRENT_USER\\Environment
    TEMP    REG_EXPAND_SZ    %USERPROFILE%\\AppData\\Local\\Temp
    TMP    REG_EXPAND_SZ    %USERPROFILE%\\AppData\\Local\\Temp
    Path    REG_EXPAND_SZ    C:\\Users\\someuser\\AppData\\Local\\atom\\bin;%NVM_HOME%;%NVM_SYMLINK%
    NVM_HOME    REG_EXPAND_SZ    C:\\Users\\someuser\\Tools\\nvm
    NVM_SYMLINK    REG_EXPAND_SZ    C:\\Program Files\\nodejs
  `

  return Promise.resolve(str).then((registry) => parseRegistry(registry))
}

function isWindows () {
  return platform() === 'win32'
}
