export default function createPublishElement(hostElement) {
  return ({ type, payload, usePubSub }) => {
    const [ , publish ] = usePubSub();

    publish(type, payload);
  };
}
