import { LitElement, html, css } from 'lit';
import '@lion/ui/define/lion-input.js';
import '@lion/ui/define/lion-checkbox.js';
import '@lion/ui/define/lion-button.js';
import '@lion/ui/define/lion-input.js';
import { Required, MinMaxLength } from '@lion/ui/form-core.js';
import { loadDefaultFeedbackMessages } from '@lion/ui/validate-messages.js';
import { Validator } from '@lion/ui/form-core.js';

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
      padding: 0px 5px;
    }

    .inputbox,
    .input-checkbox {
      width: auto;
      display: inline-block;
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
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #todo-header {
      background-color: #3498db;
      color: #fff;
      padding: 20px;
      text-align: center;
      font-size: 1.5em;
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
        <div>
          <div id="todo-header">Todo List</div>
          <lion-input
            .validators="${new MinMaxLength({ min: 10, max: 20 })}"
            class="inputbox"
            name="input"
            id="addTodoInput"
            onKeyPress="if(this.value.length>9) return false;"
            placeholder="Enter Task Name"
          >
          </lion-input>
          <lion-button
            label="Button To Add Task"
            class="btn"
            @click=${this._addTodo}
            .modelValue="${'foo'}"
            >Add</lion-button
          >
          <div id="errorMsg" class="warnings">
            Task name is alpha numeric name with length between 3 to 10
            characters
          </div>
          <ol>
            ${this.todos.map(
              todo => html`
                <li>
                  <lion-checkbox
                    class="input-checkbox"
                    .checked=${todo.finished}
                    @change=${e => this._changeTodoFinished(e, todo)}
                  >
                  </lion-checkbox>
                  ${todo.text}
                  <lion-button
                    label="Button To Remove Task"
                    class="btn btn-delete"
                    @click=${() => this._removeTodo(todo)}
                  >
                    X
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

    loadDefaultFeedbackMessages();

    if (text.length > 2 && text.length < 11 && this.regex.test(text)) {
      this.todos = [...this.todos, { text, finished: false }];
      errMsg.style.display = 'none';
    } else {
      errMsg.style.display = 'block';
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
