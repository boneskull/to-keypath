# to-keypath

> Convert a string keypath from an array of keys

## Usage

```js
import { toKeypath } from 'to-keypath';

let path = ['a', 'b', 'c'];
let keypath = toKeypath(path); // 'a.b.c'

// valid integers are represented in brackets
// invalid javascript identifiers are wrapped in brackets & double-quotes
path = ['a', '0', '.c'];
keypath = toKeypath(path); // 'a[0].["."].c'
```

`to-keypath` is distributed as a dual ESM/CJS package, courtesy of
[tshy](https://github.com/isaacs/tshy).

## Motivation

There are tens of packages that do the inverse of this operation. Others return
a value within an object when provided a string or string array. The reason for
this, presumably, is that the most common relevant use case for these "keypath"
strings is _access_ or _assignment_ to some deeply-nested property within an
object.

**This package does not do any of that.** `to-keypath` just gives you a string.
It does not consider the data structure to which the string would be applied,
returns no values and performs no validation.

It's probably useless to you _unless_ your program _outputs_ the resulting
string (my use case) _or_ you are consuming an ill-conceived API which a string
_only_. If the latter, please read the following warning:

> ![WARNING]
>
> If you're trying to pass the result of `to-keypath`'s value to another API,
> understand that this package is _not_ meant to be used as such a workaround;
> _you are probably making a mistake_ and are _strongly discouraged_ from using
> `to-keypath` in such a way.

## License

©️ 2024 [Christopher "boneskull" Hiller](https://github.com/boneskull). Licensed Apache-2.0
