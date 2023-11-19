import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import Sinon, { stub } from 'sinon';
import '../src/todo-app.js';

describe('TodoApp', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<todo-app></todo-app>`);
  });
  it('todo app should be accessible', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('renders a h2', () => {
    const h2 = element.shadowRoot.querySelector('h2');
    expect(h2).to.exist;
    expect(h2.textContent).to.equal('Todo List');
  });

  it('Checking for input-box', async () => {
    const el = await fixture(html`<lion-input .value="text"></lion-input>`);
    expect(el.getAttribute('.value')).to.be.equal('text');
  });

  it('checking for add method', () => {
    const myFunction = Sinon.spy(element, '_addTodo');
    const button = element.shadowRoot.querySelectorAll('lion-button');
    button[0].click();
    expect(myFunction.calledOnce).to.be.false;
  });

  it('checking for delete method', () => {
    const myFunction = Sinon.spy(element, '_removeTodo');
    const button = element.shadowRoot.querySelectorAll('lion-button');
    button[0].click();
    expect(myFunction.calledOnce).to.be.false;
  });

  it('checking for update task list method', () => {
    const myFunction = Sinon.spy(element, '_changeTodoFinished');
    const button = element.shadowRoot.querySelectorAll('lion-button');
    button[0].click();
    expect(myFunction.calledOnce).to.be.false;
  });

});
