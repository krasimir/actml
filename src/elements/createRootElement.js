export default function createRootElement(context) { 
  return {
    __actml: true,
    context,
    scope: {},
    dispatch(){},
    readFromScope(key, requester) {
      let value = this.scope[key];
      if (typeof value !== 'undefined') return value;

      value = this.context[key];
      if (typeof value !== 'undefined') return value;

      requester = requester === '' ? 'unknown' : requester;
      throw new Error(`Undefined variable "${ key }" requested by <${ requester }>.`);
    }
  }
}