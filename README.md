cache
=========
A simple cache for caching primitive typed data.

Example
==========

```javascript

    const Cache = require('cache')

    const cache = new Cache(7200000) // ttl = 7200 seconds
    cache.set('token', 'thisisatoken', 10)  // token ttl only 10 milliseconds
    setTimeout(() => {
        console.log(cache.get('token') === undefined)
    }, 10)
    
```

License
=========

MIT license