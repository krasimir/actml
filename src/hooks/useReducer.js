export default function createUseReducerHook(useState) {
  return (reducer, initialState) => {
    const [ data, setData ] = useState(initialState);

    return [
      data,
      (action => setData(reducer(data, action)))
    ];
  };
}
