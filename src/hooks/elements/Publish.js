export default function createPublishElement(hostElement, useChildren, usePubSub) {
  return ({ type, payload }) => {
    const { publish } = usePubSub(hostElement);

    publish(type, payload);
  };
}
