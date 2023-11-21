import { LitElement, html, css } from 'lit';
import { loadDefaultFeedbackMessages } from '@lion/ui/validate-messages.js';
import '@lion/ui/define/lion-form.js';
import '@lion/ui/define/lion-input.js';
import '@lion/ui/define/lion-checkbox.js';
import '@lion/ui/define/lion-button.js';
import './todo-list.js';

import { Required, Pattern, MinLength, MaxLength } from '@lion/ui/form-core.js';

class TodoApp extends LitElement {
  static properties = {
    todos: { type: Array },
  };

  static styles = css`
    .btn {
      border: 1px solid gray;
      cursor: pointer;
      padding: 2px 5px;
      margin: 2px;
      border-radius: 5px;
    }

    .btn:hover {
      background-color: #bbb;
    }

    [id^=feedback-lion-input]{
      color:red;
    }

    .btn-add {
      margin-top: 15px;
      position: fixed;
    }

    .btn-delete {
      line-height: 9px;
      padding: 4px;
    }

    .input-box {
      width: auto;
      display: inline-block;
    }

    .input-checkbox {
      
    }

    #todo-container {
      font-size: 14px !important;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
      padding: 15px;
      background-color: white;
      height: 100%;
    }

    label {
      display: block;
      margin-top: 3px !important;
    }

    h2 {
      background-color: black;
      color: #fff;
      padding: 20px;
      text-align: center;
      font-size: 1.5em;
      margin-bottom: 15px;
    }

    .form-content {
      margin-left: 43%;
    }
  `;

  constructor() {
    super();
    this.header = 'My Todo app';
    this.todos = [
      { text: 'Lit', finished: true },
      { text: 'Lion', finished: true },
      { text: 'App', finished: true },
    ];
    this.regex = /^[a-zA-Z]+$/;
  }

  render() {
    const finishedCount = this.todos.filter(e => e.finished).length;
    const unfinishedCount = this.todos.length - finishedCount;

    return html`
      <div class="container" id="todo-container">
        <h2>Todo List</h2>

        <div class="form-content">
          <lion-form class="center">
            <form>
              <lion-input
                class="input-box"
                name="addTodoInput"
                id="addTodoInput"
                label="Enter Task name"
                placeholder="Enter Task Name"
                .validators="${[
                  new Pattern(/^[a-zA-Z\s]*$/, {
                    getMessage: () => 'Only alphabets are allowed',
                  }),
                  new MinLength(3, {
                    getMessage: () => 'Minimum 3 characters required',
                  }),
                  new MaxLength(10, {
                    getMessage: () => 'Maximum 10 characters permitted',
                  }),
                  new Required(
                    {},
                    { getMessage: () => 'Task name is required' }
                  ),
                ]}"
              >
              </lion-input>

              <lion-button
                label="Button To Add Task"
                title="button"
                type="button"
                class="btn btn-add"
                @click=${this._addTodo}
              >
                Add
              </lion-button>
            </form>
          </lion-form>

          <todo-list
            .todos=${this.todos}
            @change-todo-finished="${this._changeTodoFinished}"
            @remove-todo="${this._removeTodo}"
          >
          </todo-list>

          <div class="status-finished">Total Finished: ${finishedCount}</div>

          <div class="status-unfinished">Total Unfinished: ${unfinishedCount}</div>
        </div>
      </div>
    `;
  }

  //This function is called to add items to the list
  _addTodo() {
    const input = this.shadowRoot.getElementById('addTodoInput');
    const inputText = input.value;

    //Loads error messages
    loadDefaultFeedbackMessages();

    //Add new tasks to the list only if input is valid
    if (
      inputText.length > 2 &&
      inputText.length < 11 &&
      this.regex.test(inputText)
    ) {
      this.todos = [...this.todos, { inputText, finished: false }];
    }
    input.value = '';
  }

  //removes todo item from the list
  _removeTodo(e) {
    this.todos = this.todos.filter(todo => todo !== e.detail);
  }

  //change todo item status
  _changeTodoFinished(e) {
    const { changedTodo, finished } = e.detail;

    this.todos = this.todos.map(todo => {
      if (todo !== changedTodo) {
        return todo;
      }
      return { ...changedTodo, finished };
    });
  }
}

customElements.define('todo-app', TodoApp);
