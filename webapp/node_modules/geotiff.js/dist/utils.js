"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assign = assign;
exports.chunk = chunk;
exports.endsWith = endsWith;
exports.forEach = forEach;
exports.invert = invert;
exports.range = range;
exports.times = times;
exports.toArray = toArray;
exports.toArrayRecursively = toArrayRecursively;
function assign(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
}

function chunk(iterable, length) {
  var results = [];
  var lengthOfIterable = iterable.length;
  for (var i = 0; i < lengthOfIterable; i += length) {
    var chunked = [];
    for (var ci = i; ci < i + length; ci++) {
      chunked.push(iterable[ci]);
    }
    results.push(chunked);
  }
  return results;
}

function endsWith(string, expectedEnding) {
  if (string.length < expectedEnding.length) {
    return false;
  }
  var actualEnding = string.substr(string.length - expectedEnding.length);
  return actualEnding === expectedEnding;
}

function forEach(iterable, func) {
  var length = iterable.length;

  for (var i = 0; i < length; i++) {
    func(iterable[i], i);
  }
}

function invert(oldObj) {
  var newObj = {};
  for (var key in oldObj) {
    if (oldObj.hasOwnProperty(key)) {
      var value = oldObj[key];
      newObj[value] = key;
    }
  }
  return newObj;
}

function range(n) {
  var results = [];
  for (var i = 0; i < n; i++) {
    results.push(i);
  }
  return results;
}

function times(numTimes, func) {
  var results = [];
  for (var i = 0; i < numTimes; i++) {
    results.push(func(i));
  }
  return results;
}

function toArray(iterable) {
  var results = [];
  var length = iterable.length;

  for (var i = 0; i < length; i++) {
    results.push(iterable[i]);
  }
  return results;
}

function toArrayRecursively(input) {
  if (input.length) {
    return toArray(input).map(toArrayRecursively);
  }
  return input;
}