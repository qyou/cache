/**
 * A simple copy and deepcopy module just like Python copy module using ES6
 * Author: qyou.casia@gmail.com
 *
 * License: MIT License
 * copyright 2018 qyou.casia@gmail.com
 * 
 * Example:
 *  >> const cache = require('cache')(60000) // ttl = 1 min
 *  >> cache.set('token', 'thisisatoken', 10)
 *  >> setTimeout(()=> console.log(cache.get('token') === undefined, 10)
*/

!function () {
    class Cache {
        constructor(ttl) {
            this.ttl = ttl || 0
            this._cache = {}
        }

        now() {
            return (new Date()).getTime()
        }

        set(key, value, ttl) {
            if (ttl === undefined) {
                ttl = this.ttl
            }
            let oldValue = this.del(key)
            if (value != null) {
                this._cache[key] = {
                    expires: this.now() + ttl,
                    val: value
                }
            }
            return oldValue
        }

        del(key) {
            let oldValue = this.get(key)
            delete this._cache[key]
            return oldValue
        }

        get(key) {
            let value = undefined
            const obj = this._cache[key]
            if (obj) {
                value = obj.val
                if (this.now() >= obj.expires) {
                    value = undefined
                    delete this._cache[key]
                }
            }
            return value
        }
    }

    module.exports = Cache
}()

