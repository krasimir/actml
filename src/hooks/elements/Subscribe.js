export default function createSubscribeElement(hostElement) {
  return ({ type, useChildren, usePubSub }) => {
    const [ children ] = useChildren();
    const [ subscribe ] = usePubSub(hostElement);

    subscribe(type, children);
  };
};
