import createSubscribeElement from './elements/Subscribe';
import createPublishElement from './elements/Publish';

export default function createUseElementsHook(hostElement) {
  return () => ({
    Subscribe: createSubscribeElement(hostElement),
    Publish: createPublishElement(hostElement)
  });
};
