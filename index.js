module.exports = {
  getAttribute: getAttribute,
  getContent: getContent,
  hasAttribute: hasAttribute,
  removeAttribute: removeAttribute,
  setAttribute: setAttribute,
  setContent: setContent
};

function getAttribute (element, attr) {
  var match, attrs, quote, index, end;

  if (typeof element == 'string') {
    attrs = element.slice(element.indexOf('<'), element.indexOf('>'));

    if (!attrs) return;

    index = attrs.indexOf(' ' + attr + '=');

    if (index == -1) {
      end = attrs.indexOf(' ' + attr);
      if (end == -1) return null;

      end += attr.length + 1;
      match = attrs.charAt(end);
      return match == ' ' || match == '/' || match == '>' ? '' : null;
    }

    index += attr.length + 2;
    quote = attrs.charAt(index);

    return attrs.slice(index + 1, attrs.indexOf(quote, index + 1));
  }

  return element.getAttribute(attr);
}

function getContent (element) {
  var match, end;

  if (typeof element == 'string') {
    match = element.match(/>((.|\n)+)</);

    if (!match) {
      end = element.indexOf('>');

      if (element.charAt(end - 1) == '/' || element.charAt(end - 2) == '/') {
        return getAttribute(element, 'value') || '';
      }
    }

    return match[1];
  }

  return element.innerText;
}

function hasAttribute (element, attr) {
  var match, attrs, quote, index, end;

  if (typeof element == 'string') {
    attrs = element.slice(element.indexOf('<'), element.indexOf('>'));

    if (!attrs) return false;

    index = attrs.indexOf(' ' + attr + '=');

    if (index > -1) return true;

    index = attrs.indexOf(' ' + attr);
    if (index == -1) return false;

    index += attr.length + 1;
    match = attrs.charAt(index);
    return match == ' ' || match == '/' || match == '>' ? '' : false;
  }

  return element.hasAttribute(attr);
}

function removeAttribute (element, attr) {
  var match, index, quote, value, attrs;

  if (typeof element == 'string') {
    attrs = element.slice(0, element.indexOf('>'));

    if (!attrs) return element;

    index = attrs.indexOf(' ' + attr + '=');

    if (index == -1) return element;

    index++;
    quote = attrs.charAt(index + attr.length + 1);

    return element.slice(0, index) + element.slice(element.indexOf(quote, index + attr.length + 2) + 1);
  }

  element.removeAttribute(attr);
  return element;
}


function setAttribute (element, attr, value) {
  var match, attrs, quote, index;

  if (typeof element == 'string') {
    attrs = element.slice(0, element.indexOf('>'));

    if (!attrs) return element;

    index = attrs.indexOf(' ' + attr + '=');

    if (index == -1) {
      return attrs + ' ' + attr + '="' + value + '"' + element.slice(attrs.length);
    }

    index += attr.length + 2;
    quote = attrs.charAt(index);

    return element.slice(0, index) + quote + value + element.slice(attrs.indexOf(quote, index + 1));
  }

  element.setAttribute(attr, value);
  return element;
}

function setContent (element, value) {
  if (typeof element == 'string') {
    return element.replace(/>(.|\n)+</, '>' + value + '<');
  }

  element.innerText = value;
  return element;
}
