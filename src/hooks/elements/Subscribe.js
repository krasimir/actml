export default function createSubscribeElement(hostElement, useChildren, usePubSub) {
  return ({ type }) => {
    const [ children ] = useChildren();
    const { subscribe } = usePubSub(hostElement);

    subscribe(type, children);
  };
};
