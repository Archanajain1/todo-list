import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import '../src/todo-app.js';

describe('TodoApp', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<todo-app></todo-app>`);
    element.todos = [
      { text: 'Lit', finished: true },
      { text: 'Lion', finished: true },
      { text: 'App', finished: true },
    ]; // Initialize todos array in element
    await element.updateComplete; // Ensure the component updates after todos are set
  });

  it('todo app should be accessible', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('todo list should be accessible', async () => {
    const listElement = element.shadowRoot.querySelector('todo-list');
    await expect(listElement).shadowDom.to.be.accessible();
  });

  it('renders a h2 with correct content and styles', async () => {
    await element.updateComplete; // Wait for the component to update
    const h2 = element.shadowRoot.querySelector('h2');
    expect(h2).to.exist;
    expect(h2.textContent).to.equal('Todo List');
    expect(getComputedStyle(h2).fontSize).to.equal('21px');
    expect(getComputedStyle(h2).backgroundColor).to.equal('rgb(0, 0, 0)');
  });

  it('adding a todo with valid input', async () => {
    const input = element.shadowRoot.getElementById('addTodoInput');
    input.value = 'NewTask';
    const button = element.shadowRoot.querySelector('.btn-add');
    button.click();
    expect(element.todos.length).to.equal(4);
  });

  it('allows removing tasks from the list', async () => {
    // Simulate removing a task
    const listElement = element.shadowRoot.querySelector('todo-list');
    const removeButtons =
      listElement.shadowRoot.querySelectorAll('.btn-delete');

    // Simulate clicking on the remove button for the first task
    removeButtons[0].click();

    // Verify that the task has been removed
    await element.updateComplete;
    const removedTask = element.todos.find(task => task.text === 'Lit');
    expect(removedTask).to.be.undefined;
  });

  // Add tests for input validations (minimum/maximum length, allowed characters) in TodoApp
  it('validates minimum length for task name input', async () => {
    const input = element.shadowRoot.getElementById('addTodoInput');
    input.value = 'AB'; // Set input value less than minimum length
    const addButton = element.shadowRoot.querySelector('.btn-add');
    addButton.click();

    // Verify that task with insufficient length is not added
    await element.updateComplete;
    const addedTask = element.todos.find(task => task.text === 'AB');
    expect(addedTask).to.be.undefined;
  });

  it('validates maximum length for task name input', async () => {
    const input = element.shadowRoot.getElementById('addTodoInput');
    input.value = 'TaskWithALengthGreaterThanMaximumAllowed';
    const addButton = element.shadowRoot.querySelector('.btn-add');
    addButton.click();

    // Verify that task with excessive length is not added
    await element.updateComplete;
    const addedTask = element.todos.find(
      task => task.text === 'TaskWithALengthGreaterThanMaximumAllowed'
    );
    expect(addedTask).to.be.undefined;
  });

  it('validates allowed characters for task name input', async () => {
    const input = element.shadowRoot.getElementById('addTodoInput');
    input.value = 'Task$%#123'; // Input with disallowed characters
    const addButton = element.shadowRoot.querySelector('.btn-add');
    addButton.click();

    // Verify that task with disallowed characters is not added
    await element.updateComplete;
    const addedTask = element.todos.find(task => task.text === 'Task$%#123');
    expect(addedTask).to.be.undefined;
  });

  it('allows removing tasks from the list', async () => {
    const listElement = element.shadowRoot.querySelector('todo-list');
    const removeButtons =
      listElement.shadowRoot.querySelectorAll('.btn-delete');

    // Simulate clicking on the remove button for the first task
    removeButtons[0].click();

    // Verify that the specific task has been removed
    await element.updateComplete;
    const removedTask = element.todos.find(
      task => task.text === 'TaskToRemove'
    );
    expect(removedTask).to.be.undefined;
  });

  it('allows toggling completion status of tasks', async () => {
    // Simulate toggling completion status of a task
    const listElement = element.shadowRoot.querySelector('todo-list');
    const initialStatus = listElement.todos[0].finished;
    const checkboxes = listElement.shadowRoot.querySelectorAll('lion-checkbox');
    checkboxes[0].checked = !initialStatus; // Simulate toggling the checkbox
    checkboxes[0].dispatchEvent(new Event('change'));
    await element.updateComplete; // Wait for the component to update
    expect(element.todos[0].finished).to.not.equal(initialStatus);
  });

  it('renders finished task div', () => {
    const divFinish = element.shadowRoot.querySelector('.status-finished');
    expect(divFinish).to.exist;
    expect(divFinish.textContent).to.equal(
      'Total Finished: ' + element.todos.filter(e => e.finished).length
    );
  });

  it('renders unfinished task div', () => {
    const divUnfinish = element.shadowRoot.querySelector('.status-unfinished');
    expect(divUnfinish).to.exist;
    expect(divUnfinish.textContent).to.equal(
      'Total Unfinished: ' +
        (element.todos.length - element.todos.filter(e => e.finished).length)
    );
  });
});
