var outer = require("./");
var domify = require("domify");
var template = require('multiline');
var isNode = require('is-node');
var div;
var input;

beforeEach(function () {
  div = template(function(){/*
    <div class="foo bar">
      hello >< world
    </div>
  */});

  input = template(function(){/*
    <input class="span eggs" disabled autocomplete/>
  */});

  if (isNode) return;

  div = domify(div)[0];
  input = domify(input)[0];
});

describe('getContent', function(){
  it('returns the content of given HTML', function(){
    expect(outer.getContent(div).trim()).to.equal('hello >< world');
  });

  it('returns empty string when there is no content', function(){
    expect(outer.getContent(input)).to.equal('');
  });
});

describe('setContent', function(){
  it('changes the content of given HTML', function(){
    div = outer.setContent(div, 'lorem <<ipsum>>');
    expect(outer.getContent(div).trim()).to.equal('lorem <<ipsum>>');
  });
});

describe('getAttribute', function(){
  it('returns the value of given attribute', function(){
    expect(outer.getAttribute(div, 'class').trim()).to.equal('foo bar');
  });

  it('returns null for unexisting attributes', function(){
    expect(outer.getAttribute(div, 'nonexisting')).to.equal(null);
  });

  it('returns empty string for boolean attributes', function(){
    expect(outer.getAttribute(input, 'disabled')).to.equal('');
    expect(outer.getAttribute(input, 'autocomplete')).to.equal('');
    expect(outer.getAttribute(input, 'autocomplet')).to.equal(null);
    expect(outer.getAttribute(input, 'complete')).to.equal(null);
  });
});

describe('setAttribute', function(){
  it('sets the value of given attribute', function(){
    div = outer.setAttribute(div, 'clas', 'corge qux');
    div = outer.setAttribute(div, 'class', 'span eggs');
    expect(outer.getAttribute(div, 'class')).to.equal('span eggs');

    div = outer.setAttribute(div, 'clas', 'corge qux quux');
    expect(outer.getAttribute(div, 'class')).to.equal('span eggs');
    expect(outer.getAttribute(div, 'clas')).to.equal('corge qux quux');
  });

  it('sets a new attribute', function(){
    div = outer.setAttribute(div, 'data-foo', 'hello world');
    expect(outer.getAttribute(div, 'data-foo')).to.equal('hello world');
    expect(outer.getAttribute(div, 'class')).to.equal('foo bar');

    div = outer.setAttribute(div, 'class', 'span eggs');
    expect(outer.getAttribute(div, 'class')).to.equal('span eggs');
    expect(outer.getAttribute(div, 'data-foo')).to.equal('hello world');
  });

  it('sets a new empty attribute', function(){
    div = outer.setAttribute(div, 'data-nil', '');
    expect(outer.getAttribute(div, 'data-nil')).to.equal('');
  });

});

describe('removeAttribute', function(){
  it('removes specified attribute', function(){
    input = outer.setAttribute(input, 'clas', 'corge qux');
    input = outer.setAttribute(input, 'classs', 'span eggs');
    input = outer.setAttribute(input, 'data-foo', '');
    input = outer.removeAttribute(input, 'class');

    expect(outer.getAttribute(input, 'nonexisting')).to.equal(null);
    expect(outer.getAttribute(input, 'clas')).to.equal('corge qux');
    expect(outer.getAttribute(input, 'classs')).to.equal('span eggs');
    expect(outer.getAttribute(input, 'data-foo')).to.equal('');
  });
});

describe('hasAttribute', function(){
  it('returns true if given element has given attribute', function(){
    input = outer.setAttribute(input, 'data-foo', '');
    input = outer.removeAttribute(input, 'class');
    expect(outer.hasAttribute(input, 'class')).to.be.false;
    expect(outer.hasAttribute(input, 'nonexisting')).to.be.false;
    expect(outer.hasAttribute(input, 'd')).to.be.false;
    expect(outer.hasAttribute(input, 'auto')).to.be.false;
    expect(outer.hasAttribute(input, 'mplete')).to.be.false;
  });
});
