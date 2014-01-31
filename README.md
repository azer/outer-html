## outer-html

Basic cross-platform methods for editing outer HTML. All methods work with either
HTML strings and actual DOM elements.

Example:

```js
outer = require('outer-html')
element = '<div class="foo bar">hello world</div>'

outer.getContent(element)
// => hello world

outer.getAttribute(element, 'class')
// => foo bar

element = outer.setAttribute(element, 'class', 'span eggs')
element = outer.setContent(element, 'lorem ipsum sit dolar')

element
// => '<div class="span eggs">lorem ipsum sit dolar</div>'
```

## Install

```bash
$ npm install outer-html
```

## Reference

Methods available:

* getAttribute
* getContent
* hasAttribute
* removeAttribute
* setAttribute
* setContent
