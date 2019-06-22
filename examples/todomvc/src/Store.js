var todos = [
  {
    label: 'First task',
    completed: false,
    editing: false
  },
  {
    label: 'Second task',
    completed: false,
    editing: false
  }
];

export function State() {
  return todos;
}

export function Reducer({ action }) {
  const { type, todoIndex } = action;

  switch (type) {
    case 'toggle':
      todos = todos.map((todo, index) => {
        if (index === todoIndex) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      });
  }
};
