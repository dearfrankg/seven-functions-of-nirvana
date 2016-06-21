
Array.prototype.reduce = function (fn, initialValue) {
  let acc = initialValue
  for (var i = 0; i < this.length; i++) {
    acc = fn(acc, this[i], i)
  }
  return acc
}

Array.prototype.forEach = function (fn) {
  this.reduce((acc, curr, i) => {
    acc.push(fn(this[i], i))
    return acc
  }, [])
}

Array.prototype.filter = function (fn) {
  return this.reduce((acc, curr, i) => {
    if (fn(this[i])) {
      acc.push(this[i])
    }
    return acc
  }, [])
}

Array.prototype.map = function (fn) {
  return this.reduce((acc, curr, i) => {
    acc.push(fn(this[i]))
    return acc
  }, [])
}

Array.prototype.concatAll = function () {
  return this.reduce((acc, curr, i) => {
    curr.forEach((item) => acc.push(item))
    return acc
  }, [])
}

Array.prototype.concatMap = function (fnReturningArray) {
  return this.map((item) => fnReturningArray(item))
    .concatAll()
}

Array.zip = function (left, right, combinerFn) {
  'use strict'
  let counter
  let result = []
  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    result.push(combinerFn(left[i], right[i]))
  }
  return result
}
