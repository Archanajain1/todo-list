import { LitElement, html, css } from 'lit';

export class TodoList extends LitElement {
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

    .input-checkbox {
      display: inline-flex;
    }

    label {
      display: block;
      margin-top: 3px !important;
    }

    .list-align {
      margin-bottom: 15px;
    }
  `;

  render() {
    if (!this.todos) {
      return html``;
    }

    return html`
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
                  > x
                  </lion-button>
                </li>
              `
        )}
      </ol>
    `;
  }

  // This function is called on checkbox click to update task status
  _changeTodoFinished(e, changedTodo) {
    const eventDetails = { changedTodo, finished: e.target.checked };
    this.dispatchEvent(
      new CustomEvent('change-todo-finished', { detail: eventDetails })
    );
  }

  // This function is called to remove any task from the list
  _removeTodo(item) {
    this.dispatchEvent(new CustomEvent('remove-todo', { detail: item }));
  }
}

customElements.define('todo-list', TodoList);
