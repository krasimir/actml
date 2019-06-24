var initialValue = [
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

export default function Store({ useState, useProduct, usePubSub }) {
  const [ todos, setTodos ] = useState(initialValue);
  const [ setProduct ] = useProduct(todos);
  const [ subscribe ] = usePubSub();

  subscribe('toggle', (todoIndex) => {
    setProduct(setTodos(todos.map((todo, index) => {
      if (index === todoIndex) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    })));
  });
}
