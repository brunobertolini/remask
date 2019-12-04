<h1 align="center">
  <img src="logo.png" alt="reMask" />
</h1>

> A multi-mask lib

## Install

```
yarn add vanilla-masker remask
```

## Usage

```js
import { mask } from 'remask'

const value = 'ABC1C83'
const pattern = 'AAA - 9S99'

mask(value, pattern)
// ABC - 1C83
```

Pattern can be a pattern array, so remask choose one pattern based on pattern/value length match

```js
const patterns = ['999.999.999-99', '99.999.999/9999-99']

mask('12345678901', patterns) // gets firts pattern (999.999.999-99)
// 123.456.789-01

mask('12345678000106', patterns) // gets second pattern (99.999.999/9999-99)
// 12.345.678/0001-06
```

## License

MIT © [Bruno Bertolini](http://brunobertolini.com)
