import { LitElement, html, css } from 'lit';
import '@lion/ui/define/lion-form.js';
import '@lion/ui/define/lion-input.js';
import '@lion/ui/define/lion-checkbox.js';
import '@lion/ui/define/lion-button.js';
import { loadDefaultFeedbackMessages } from '@lion/ui/validate-messages.js';
//import { LocalizeMixin,localize } from '@lion/ui/localize.js';
import {
  Required,
  MinMaxLength,
  MaxNumber,
  MinLength,
  Pattern,
} from '@lion/ui/form-core.js';

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

    .btn-delete {
      line-height: 9px;
      padding: 4px;
    }

    .inputbox {
      width: auto;
      display: inline-block;
    }

    .input-checkbox {
      display: inline-flex;
    }

    .warnings {
      color: red;
      display: none;
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
    .list-align {
      margin-bottom: 15px;
    }
  `;

  constructor() {
    super();
    this.header = 'My Todo app';
    this.todos = [
      { text: 'Task 1', finished: true },
      { text: 'Task 2', finished: true },
      { text: 'Task 3', finished: true },
    ];
    this.regex = /^[a-zA-Z0-9]+$/;
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
                class="inputbox"
                name="addTodoInput"
                id="addTodoInput"
                label="Enter Task name"
                placeholder="Enter Task Name"
              >
              </lion-input>
              <lion-button
                label="Button To Add Task"
                title="button"
                type="button"
                class="btn"
                @click=${this._addTodo}
                >Add</lion-button
              >
            </form>
          </lion-form>
          <ol class="list-align">
            ${this.todos.map(
              todo => html`
                <li class="list-align">
                  <lion-checkbox
                    class="input-checkbox"
                    .checked=${todo.finished}
                    @change=${e => this._changeTodoFinished(e, todo)}
                    label="Todo"
                  >
                  </lion-checkbox>

                  <span>${todo.text}<span>

                  <lion-button
                    label="Button To Remove Task"
                    class="btn btn-delete"
                    @click=${() => this._removeTodo(todo)}
                  >
                    x
                  </lion-button>
                </li>
              `
            )}
          </ol>

          <div>Total Finished: ${finishedCount}</div>
          <div>Total Unfinished: ${unfinishedCount}</div>
        </div>
      </div>
    `;
  }

  //adds items to the list
  _addTodo() {
    const input = this.shadowRoot.getElementById('addTodoInput');
    const errMsg = this.shadowRoot.getElementById('errorMsg');
    const text = input.value;

    //loadDefaultFeedbackMessages();

    if (text.length > 2 && text.length < 11 && this.regex.test(text)) {
      this.todos = [...this.todos, { text, finished: false }];
      //errMsg.style.display = 'none';
    } else {
      //errMsg.style.display = 'block';
    }
    input.value = '';

    // this.todos.push({text, finished: false});
    // this.requestUpdate();
  }

  //removes todo item from the list
  _removeTodo(todo) {
    this.todos = this.todos.filter(e => e !== todo);
  }

  //change todo item status
  _changeTodoFinished(e, changedTodo) {
    const finished = e.target.checked;

    this.todos = this.todos.map(todo => {
      if (todo !== changedTodo) {
        return todo;
      }
      return { ...changedTodo, finished };
    });
  }
}

customElements.define('todo-app', TodoApp);
