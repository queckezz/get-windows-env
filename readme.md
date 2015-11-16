
# get-windows-env

[![NPM version][version-image]][version-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Js Standard Style][standard-image]][standard-url]

Get a list of system or user environment variables on windows. `process.env` is not enough because you can't differentiate by system or user environment variables.

## Example

See [test/index.js](./test/index.js) for full examples.

```js
import { getUserEnv, getSystemEnv } from 'get-windows-env'

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

## Tests

```bash
$ npm test
```

## License

[MIT][license-url]

[version-image]: https://img.shields.io/npm/v/get-windows-env.svg?style=flat-square
[version-url]: https://npmjs.org/package/get-windows-env

[david-image]: http://img.shields.io/david/queckezz/get-windows-env.svg?style=flat-square
[david-url]: https://david-dm.org/queckezz/get-windows-env

[standard-image]: https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard

[license-image]: http://img.shields.io/npm/l/get-windows-env.svg?style=flat-square
[license-url]: ./license
