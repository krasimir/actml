export default function createPublishElement(hostElement) {
  return ({ type, payload, usePubSub }) => {
    const [ , publish ] = usePubSub(hostElement);

    publish(type, payload);
  };
}
