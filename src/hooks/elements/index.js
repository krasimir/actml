import createPublishElement from './Publish';
import createSubscribeElement from './Subscribe';

export default function createUseElementsHook(element) {
  return {
    Publish: createPublishElement(element),
    Subscribe: createSubscribeElement(element)
  };
}
