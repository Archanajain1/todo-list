import { html } from 'lit';
import '../src/todo-app.js';

export default {
  title: 'TodoApp',
  component: 'todo-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <todo-app
      style="--todo-app-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </todo-app>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
