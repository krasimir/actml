export default (element, type) => {
  const { props, scope, result } = element;

  switch(type) {
    case 'IN':
      if (console.group) {
        console.group(`<${ element.name }>`, { props });
      } else {
        console.log(`<${ element.name }>`, { props });
      }
      break;
    case 'OUT':
      console.log(`</${ element.name }>`, { scope, result });
      if (console.group) {
        groupEnd();  
      }
      break;
    default:
      console.log(`<${ element.name }>(${ type })`);
  }
}