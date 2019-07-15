!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).actml=e()}}(function(){return function o(i,c,f){function s(n,e){if(!c[n]){if(!i[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(l)return l(n,!0);var r=new Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r}var u=c[n]={exports:{}};i[n][0].call(u.exports,function(e){return s(i[n][1][e]||e)},u,u.exports,o,i,c,f)}return c[n].exports}for(var l="function"==typeof require&&require,e=0;e<f.length;e++)s(f[e]);return s}({1:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e,n,t){if("function"!=typeof e)throw new Error('ActML element expects a function. "'+e+'" given instead.');return{__actml:!0,__used:0,__running:!1,id:null,props:n,name:function(e){if(e.name)return e.name;var n=/^function\s+([\w\$]+)\s*\(/.exec(e.toString());return n?n[1]:"unknown"}(e),children:t,initialize:function(e,n){var t=1<arguments.length&&void 0!==n?n:0;this.id=e,this.__used=t,this.__running=!1},mergeProps:function(e){this.props=Object.assign({},this.props,e)},used:function(){return this.__used},isRunning:function(){return this.__running},enter:function(){this.__running=!0},consume:function(){return e(this.props)},out:function(){this.__used+=1,this.__running=!1}}}},{}],2:[function(e,n,t){"use strict";function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(o){return function(n){var e,u="c"+ ++f;return r(e={},c,function(){return s(o.node(),u)||n}),r(e,"Provider",function(e){var n=e.value,t=e.children,r=o.node();return r[i]||(r[i]={}),r[i][u]=n,t}),r(e,"Consumer",function(e){(0,e.children)(s(o.node(),u)||n)}),e}};var i="__CONTEXT_KEY__",c=t.PUBLIC_CONTEXT_KEY="__PUBLIC_CONTEXT_KEY__",f=0;function s(e,n,t){var r=2<arguments.length&&void 0!==t?t:[];return r.push(e.element.name),e[i]&&n in e[i]?e[i][n]:e.parent?s(e.parent,n,r):void console.warn("A context consumer is used with no provider.\n  Stack:\n"+r.map(function(e){return"    <"+e+">"}).join("\n"))}},{}],3:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){function f(c){(e=c).enter(),c.rerun=function(){return f(c)},c.element.mergeProps({children:function(c,f){function e(){var r=arguments,u=c.element.children;if(u&&0<u.length){for(var o=[],i=[],n=(0,l.default)("  "+c.element.name+":children"),e=function(e){var n;if((0,s.default)(u[e]))(n=u[e]).mergeProps.apply(n,r),o.push(function(){return f(c.addChildNode(u[e]))});else if("function"==typeof u[e]){var t=u[e].apply(u,r);(0,s.default)(t)?o.push(function(){return f(c.addChildNode(t))}):i.push(t)}else i.push(u[e])},t=0;t<u.length;t++)e(t);return o.reverse().forEach(function(e){n.prependItem(v,e,function(e){return i.push(e)})}),n.process(),n.onDone(function(){return i})}}return e[a]=!0,e}(c,f)});var n={},t=(0,l.default)(" "+c.element.name);return t.add(d,function(){return c.element.consume()},function(e){return n[d]=e}),t.add(h,function(){var e=n[d];if((0,s.default)(e))t.prependItem(p,function(){return f(c.addChildNode(e))},function(e){return n[p]=e});else if(m(e)){var i=e;t.prependItem(p,function(){return new Promise(function(u){var o=void 0;!function n(e){if((o=i.next(e)).done)if((0,s.default)(o.value)){var t=f(c.addChildNode(o.value));_(t)?t.then(function(e){return u(e)}):u(t)}else u(o.value);else if((0,s.default)(o.value)){var r=f(c.addChildNode(o.value));_(r)?r.then(function(e){return n(e)}):n(r)}}()})},function(e){return n[p]=e})}else e&&e[a]&&t.prependItem(p,function(){return e()},function(e){n[p]=e&&1===e.length?e[0]:e})}),t.process(),t.onDone(function(){return c.out(),p in n?n[p]:n[d]})}var t=(0,r.default)(),e=null;return{node:function(){return e},run:function(e){var n=t.resolveRoot(e);return f(n)},onNodeEnter:function(e){t.addNodeEnterCallback(e)},onNodeOut:function(e){t.addNodeOutCallback(e)},onNodeRemove:function(e){t.onNodeRemove(e)},system:function(){return{tree:t,reset:function(){e=null,t.reset(),u.default.clear(),o.default.clear(),i.default.clear()}}}}};var s=c(e("./utils/isActMLElement")),r=c(e("./Tree")),u=c(e("./hooks/usePubSub")),o=c(e("./hooks/useState")),i=c(e("./hooks/useEffect")),l=c(e("./Queue"));function c(e){return e&&e.__esModule?e:{default:e}}var a="__ACTML_CHILDREN__",d="CONSUME",h="PROCESS_RESULT",p="RETURNED_ELEMENT",v="CHILD",m=function(e){return e&&"function"==typeof e.next},_=function(e){return e&&"function"==typeof e.then}},{"./Queue":4,"./Tree":5,"./hooks/useEffect":7,"./hooks/usePubSub":9,"./hooks/useState":11,"./utils/isActMLElement":14}],4:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(u){var o=[],i=!1,c=!1,f=function(){};return{add:function(e,n,t){s(u+":Q: [..."+e+"] ("+(o.length+1)+" total)"),o.push(r(e,n,t))},prependItem:function(e,n,t){s(u+":Q: ["+e+"...] ("+(o.length+1)+" total)"),o=[r(e,n,t)].concat(function(e){{if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}}(o))},process:function(e){var n=this;if(c=!0,0===o.length)return s(u+":Q:done"),c=!1,void f();var t=o.shift();s(u+":Q: "+t.type+"() ("+o.length+" left)");var r=t.func(e);l(r)?(i=!0,r.then(function(e){t.onDone(e),n.process(e)}).catch(function(e){f(e)})):(t.onDone(r),this.process(r))},onDone:function(r){return i?new Promise(function(n,t){f=function(e){e?t(e):n(r())}}):r()},isRunning:function(){return c}}};var s=function(){return null},l=function(e){return e&&"function"==typeof e.then},r=function(e,n,t){return{type:e,func:n,onDone:2<arguments.length&&void 0!==t?t:function(){}}}},{}],5:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e};t.default=function(){var t=[],r=[],u=[],n=f(),o=0;function i(e,n){return n.initialize(e.element.id,e.element.used()),e.element=n,e}function c(e,n){return!(!e||e.name!==n.name)&&(!e.props||!n.props||e.props.key===n.props.key)}function f(e,n){return e&&e.initialize("a"+ ++o),{element:e,children:[],parent:n,cursor:0,enter:function(){var n=this;l("-> "+this.element.name),this.element.enter(),t.forEach(function(e){return e(n)})},out:function(){var n=this;l("<- "+this.element.name),this.element.out(),this.cursor<this.children.length&&this.children.splice(this.cursor,this.children.length-this.cursor).forEach(function(n){return u.forEach(function(e){return e(n)})}),this.cursor=0,r.forEach(function(e){return e(n)})},addChildNode:function(e){var n=this,t=this.children[this.cursor];if(t&&c(t.element,e))return this.cursor+=1,i(t,e);var r=f(e,this);return this.children[this.cursor]&&u.forEach(function(e){return e(n.children[n.cursor])}),this.children[this.cursor]=r,this.cursor+=1,r}}}return{resolveRoot:function(e){return n=c(n.element,e)?i(n,e):f(e)},reset:function(){n=f(),o=0},getNumOfElements:function(){return o},diagnose:function(){return function n(e,t){var r=1<arguments.length&&void 0!==t?t:0,u=e.element.props?e.element.props:{},o=(u.children,function(e,n){var t={};for(var r in e)0<=n.indexOf(r)||Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}(u,["children"]));return{ind:r,name:e.element.name,props:s({children:"<function children>"},o),used:e.element.used(),id:e.element.id,children:e.children.map(function(e){return n(e,r+1)})}}(n)},addNodeEnterCallback:function(e){t.push(e)},addNodeOutCallback:function(e){r.push(e)},onNodeRemove:function(e){u.push(e)}}};var l=function(){return null}},{}],6:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,u=e("./utils/isValidHookContext"),o=(r=u)&&r.__esModule?r:{default:r},i=e("../Context");t.default=function(n){return function(e){return(0,o.default)(n),e[i.PUBLIC_CONTEXT_KEY]()}}},{"../Context":2,"./utils/isValidHookContext":12}],7:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(e("fast-deep-equal")),i=r(e("./utils/isValidHookContext"));function r(e){return e&&e.__esModule?e:{default:e}}var c={elements:{},get:function(e){return this.elements[e.id]?this.elements[e.id]:this.elements[e.id]={effects:[],consumer:0}},cleanUp:function(e){this.elements[e]&&delete this.elements[e]}};function u(e,n){var t=n.deps,r=n.oldDeps,u=n.callback;if(void 0===t)n.cleanUp=u();else if(0===t.length)1===e.element.used()&&(n.cleanUp=u());else{(function(e,n){return!!e&&(e.length===n.length&&(0,o.default)(e,n))})(r,t)||(n.cleanUp=u())}}function f(o){return o.onNodeRemove(function(e){var n=e.element;c.get(n).effects.forEach(function(e){e.cleanUp&&e.cleanUp()}),c.cleanUp(e.element.id)}),o.onNodeOut(function(n){var e=n.element,t=c.get(e);0<t.effects.length&&t.effects.forEach(function(e){return u(n,e)})}),function(e,n){(0,i.default)(o);var t=o.node().element,r=c.get(t);if(0===t.used())r.effects.push(function(e,n){return{callback:e,deps:n}}(e,n));else{var u=r.consumer;r.consumer=u<r.effects.length-1?r.consumer+1:0,function(e,n,t){e.callback=n,e.oldDeps=e.deps,e.deps=t}(r.effects[u],e,n)}}}(t.default=f).clear=function(){c.elements={}}},{"./utils/isValidHookContext":12,"fast-deep-equal":15}],8:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,u=e("./utils/isValidHookContext"),o=(r=u)&&r.__esModule?r:{default:r};t.default=function(e){return function(){return(0,o.default)(e),e.node().element}}},{"./utils/isValidHookContext":12}],9:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=s;var r,u=e("./utils/isValidHookContext"),o=(r=u)&&r.__esModule?r:{default:r};var i={},c=function(e,n,t){return i[n]||(i[n]={}),i[n][e.id]=t,function(){delete i[n][e.id]}},f=function(n,t){i[n]&&Object.keys(i[n]).forEach(function(e){i[n][e](t)})};function s(t){return t.onNodeRemove(function(n){Object.keys(i).forEach(function(e){i[e][n.element.id]&&delete i[e][n.element.id]})}),function(e){(0,o.default)(t);var n=t.node(),r=e||n.element;return{subscribe:function(){for(var e=arguments.length,n=Array(e),t=0;t<e;t++)n[t]=arguments[t];return c.apply(void 0,[r].concat(n))},publish:function(){return f.apply(void 0,arguments)},subscribers:i}}}s.clear=function(){i={}}},{"./utils/isValidHookContext":12}],10:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var f=function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,n){var t=[],r=!0,u=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(t.push(i.value),!n||t.length!==n);r=!0);}catch(e){u=!0,o=e}finally{try{!r&&c.return&&c.return()}finally{if(u)throw o}}return t}(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.default=function(c){return function(n,e){function t(e){return i(n(o(),e))}var r=c(e),u=f(r,2),o=u[0],i=u[1];return[o,t,function(u){return function(e){var n=e.action,t=e.propsToAction,r=function(e,n){var t={};for(var r in e)0<=n.indexOf(r)||Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}(e,["action","propsToAction"]);if(n)u(n);else{if(!t)throw new Error('<Dispatch> expects "action" or "propsToAction" prop.');u(t(r))}}}(t),function(){return o()}]}}},{}],11:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=o;var r,u=e("./utils/isValidHookContext"),i=(r=u)&&r.__esModule?r:{default:r};var c={elements:{},get:function(e){return this.elements[e.id]?this.elements[e.id]:this.elements[e.id]={states:[],consumer:0}},cleanUp:function(e){this.elements[e]&&delete this.elements[e]}};function o(o){return o.onNodeRemove(function(e){return c.cleanUp(e.element.id)}),function(e){(0,i.default)(o);var n=o.node(),t=n.element,r=c.get(t),u=void 0;return 0===t.used()?(r.states.push(e),u=r.states.length-1):(u=r.consumer,r.consumer=u<r.states.length-1?r.consumer+1:0),[function(){return r.states[u]},function(e){return r.states[u]=e,t.isRunning()||n.rerun(),e}]}}o.clear=function(){c.elements={}}},{"./utils/isValidHookContext":12}],12:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){if(!e)throw new Error("Something terribly wrong happened. The hook factory function is called without a processor.");if(!e.node())throw new Error("Hooks must be called in the context of an ActML element.")}},{}],13:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createRuntime=u;var f=r(e("./Processor")),s=r(e("./utils/isActMLElement")),l=r(e("./ActElement")),a=r(e("./hooks/useElement")),d=r(e("./hooks/usePubSub")),h=r(e("./hooks/useState")),p=r(e("./hooks/useReducer")),v=r(e("./hooks/useEffect")),m=r(e("./hooks/useContext")),_=r(e("./Context"));function r(e){return e&&e.__esModule?e:{default:e}}function u(){var n=(0,f.default)();var e=(0,a.default)(n),t=(0,h.default)(n),r=(0,d.default)(n),u=(0,p.default)(t),o=(0,v.default)(n),i=(0,m.default)(n),c=(0,_.default)(n);return{A:function(e,n){for(var t=arguments.length,r=Array(2<t?t-2:0),u=2;u<t;u++)r[u-2]=arguments[u];return(0,l.default)(e,n,r)},run:function(e){if(!(0,s.default)(e))throw new Error("ActML element expected. Instead "+e.toString()+" passed.");return n.run(e)},Fragment:function(e){return e.children},processor:n,useElement:e,usePubSub:r,useState:t,useReducer:u,useEffect:o,useContext:i,createContext:c}}var o=u();n.exports=o,n.exports.createRuntime=u()},{"./ActElement":1,"./Context":2,"./Processor":3,"./hooks/useContext":6,"./hooks/useEffect":7,"./hooks/useElement":8,"./hooks/usePubSub":9,"./hooks/useReducer":10,"./hooks/useState":11,"./utils/isActMLElement":14}],14:[function(e,n,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return e&&!0===e.__actml}},{}],15:[function(e,n,t){"use strict";var h=Array.isArray,p=Object.keys,v=Object.prototype.hasOwnProperty;n.exports=function e(n,t){if(n===t)return!0;if(n&&t&&"object"==typeof n&&"object"==typeof t){var r,u,o,i=h(n),c=h(t);if(i&&c){if((u=n.length)!=t.length)return!1;for(r=u;0!=r--;)if(!e(n[r],t[r]))return!1;return!0}if(i!=c)return!1;var f=n instanceof Date,s=t instanceof Date;if(f!=s)return!1;if(f&&s)return n.getTime()==t.getTime();var l=n instanceof RegExp,a=t instanceof RegExp;if(l!=a)return!1;if(l&&a)return n.toString()==t.toString();var d=p(n);if((u=d.length)!==p(t).length)return!1;for(r=u;0!=r--;)if(!v.call(t,d[r]))return!1;for(r=u;0!=r--;)if(!e(n[o=d[r]],t[o]))return!1;return!0}return n!=n&&t!=t}},{}]},{},[13])(13)});