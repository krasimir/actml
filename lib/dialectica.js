(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Word = function () {
  function Word(func, params, children) {
    _classCallCheck(this, Word);

    this.func = func;
    this.params = params;
    this.children = children;
    this.__D = true;
  }

  _createClass(Word, [{
    key: "say",
    value: function say(params) {
      if (Word.isItAWord(this.func)) {
        return this.func.say(this.params);
      }
      return this.func.call(this.func, Object.assign({}, this.params, params));
    }
  }], [{
    key: "isItAWord",
    value: function isItAWord(word) {
      return word && word.__D === true;
    }
  }]);

  return Word;
}();

var Dialect = function () {
  function Dialect() {
    _classCallCheck(this, Dialect);
  }

  _createClass(Dialect, [{
    key: "speak",
    value: function speak(word) {
      var _this = this;

      if (Word.isItAWord(word)) {
        var result = void 0;

        result = word.say();

        if (word.children) {
          if (word.children.length === 1 && !Word.isItAWord(word.children[0])) {
            this.speak(word.children[0](result));
          } else {
            word.children.forEach(function (w) {
              return _this.speak(w);
            });
          }
        }
        return result;
      }
    }
  }, {
    key: "create",
    value: function create(func, params) {
      for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      return new Word(func, params, children);
    }
  }]);

  return Dialect;
}();

var d = new Dialect();

var dialect = exports.dialect = d.create.bind(d);
var speak = exports.speak = d.speak.bind(d);

},{}]},{},[1]);
