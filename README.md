# Remask

A multi-mask lib

```js
import { mask } from 'remask'

const value = 'ABC1C8323'
const pattern = 'AAA - 9S99'

mask(value, pattern)
```

Pattern can be a pattern array, so remask choose one pattern based on pattern/value length match

```js
const patterns = ['9.9', '-99=9']

mask('12', patterns) // gets firts pattern (9.9)
// 1.2

mask('123', patterns) // gets second pattern (-99=9)
// -12=3
```
