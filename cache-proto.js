/**
 * A simple copy and deepcopy module just like Python copy module
 * Author: qyou.casia@gmail.com
 *
 * License: MIT License
 * copyright 2018 qyou.casia@gmail.com
 * 
 * Example:
 *  >> const cache =new Cache(7200000) // ttl = 2 hours
 *  >> cache.set('token', 'thisisatoken', 10)
 *  >> setTimeout(()=> console.log(cache.get('token') === undefined, 10)
*/

module.exports = (function () {
    function Cache(ttl) {
        this.ttl = ttl || 0
        this._cache = {}
    }

    Cache.prototype._now = function () {
        return (new Date()).getTime()
    }

    Cache.prototype.del = function (key) {
        var oldVal = this._cache[key]
        delete this._cache[key]
        return oldVal
    }

    Cache.prototype.set = function (key, value, ttl) {
        var self = this
        if (ttl === undefined) {
            ttl = self.ttl
        }

        var oldVal = self.del(key)
        if (value != null) {
            self._cache[key] = {
                expires: self._now + ttl,
                value: value
            }
        }
        return oldVal
    }

    Cache.prototype.get = function (key) {
        var self = this
        var value = undefined
        var obj = self._cache[key]
        if (obj) {
            value = obj.value
            if (self._now() >= obj.expires) {
                value = undefined
                self.del(key)
            }
        }
        return value
    }
})()
