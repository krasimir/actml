export default (element, type) => {
  const { props, scope, result } = element;

  switch(type) {
    case 'IN':
      console.log(`<${ element.name }>`, { props });
      break;
    case 'OUT':
      console.log(`</${ element.name }>`, { scope, result });
      break;
    default:
      console.log(`<${ element.name }>(${ type })`);
  }
}