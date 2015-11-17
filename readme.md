
# get-windows-env

[![Build Status][travis-image]][travis-url]
[![NPM version][version-image]][version-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Js Standard Style][standard-image]][standard-url]

Get a list of system or user environment variables on windows.

## Why not just `process.env`?

If you want to  differentiate between user and system variables this package is for you. Otherwise `process.env` works just fine.

## Example

See [test/index.js](./test/index.js) for full examples.

```js
import {
  getUserEnv,
  getSystemEnv
} from 'get-windows-env'

getSystemEnv().then(registry => console.log(registry))
/* =>
 * [
 *   {
 *     name: 'TEMP',
 *      type: 'REG_EXPAND_SZ',
 *      path: '%USERPROFILE%\\AppData\\Local\\Temp'
 *   },
 *   {
 *     name: 'TMP',
 *     type: 'REG_EXPAND_SZ',
 *     path: '%USERPROFILE%\\AppData\\Local\\Temp'
 *   },
 *   
 *   ...
 * ]
 */
```

## API

#### `#getUserEnv()`

Gets all user environment variables.

#### `#getSystemEnv()`

Gets all system environment variables.

#### `#queryRegistry(key)`

Given a registry key, it returns you a matching that path.

#### `#parseRegistry(stdout::String)`

Parses a given registry string from the `queryRegistry()` function to a set of key value pairs  `{ name, type, path }`.

#### `#keys`

Object containing `{ user, system }` registry keys for querying the windows registry.

#### Tests

```bash
$ npm test
```

## License

[MIT][license-url]

[travis-image]: https://img.shields.io/travis/queckezz/get-windows-env.svg?style=flat-square
[travis-url]: https://travis-ci.org/queckezz/get-windows-env

[version-image]: https://img.shields.io/npm/v/get-windows-env.svg?style=flat-square
[version-url]: https://npmjs.org/package/get-windows-env

[david-image]: http://img.shields.io/david/queckezz/get-windows-env.svg?style=flat-square
[david-url]: https://david-dm.org/queckezz/get-windows-env

[standard-image]: https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard

[license-image]: http://img.shields.io/npm/l/get-windows-env.svg?style=flat-square
[license-url]: ./license
