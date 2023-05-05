[![.github/workflows/ci.yml](https://github.com/brunobertolini/remask/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/brunobertolini/remask/actions/workflows/ci.yml)

<h1 align="center">
  <img src="logo.png" alt="Remask Logo" />
</h1>

> A lightweight, dependency free and framework agnostic multi-mask lib, with Typescript support.

## Install

```
yarn add remask
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
// => 123.456.789-01

mask('12345678000106', patterns) // gets second pattern (99.999.999/9999-99)
// => 12.345.678/0001-06
```

and you can use `unmask` function to remove any mask pattern:

```js
unmask('12.345.678/0001-06')
// => 12345678000106
```

### Currency

In currency mask, Remask use [Intl.NumberFormater](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) to mask and unmask values, so you need pass [locale](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_negotiation) and currency params.

```js
import { currency } from 'remask'

currency.mask({ locale: 'pt-BR', currency: 'BRL', value: 123456.78 })
// => R$ 123.456,78

currency.unmask({ locale: 'pt-BR', currency: 'BRL', value: 'R$ 123.456,78' })
// => 123456.78
```

## License

MIT © [Bruno Bertolini](http://brunobertolini.com)
