/* eslint-disable react/prop-types */
/** @jsx A */
import { A, Fragment, useProduct, usePubSub, useState } from '../../../lib';

export const FILTER_ALL = 'FILTER_ALL';
export const FILTER_ACTIVE = 'FILTER_ACTIVE';
export const FILTER_COMPLETED = 'FILTER_COMPLETED';

export default function Filter({ children }) {
  const [ filter, setFilter ] = useState(FILTER_ALL);
  const { Subscribe } = usePubSub();

  useProduct(filter());

  return (
    <Fragment>
      { children }
      <Subscribe type={ FILTER_ALL }>
        { () => setFilter(FILTER_ALL) }
      </Subscribe>
      <Subscribe type={ FILTER_ACTIVE }>
        { () => setFilter(FILTER_ACTIVE) }
      </Subscribe>
      <Subscribe type={ FILTER_COMPLETED }>
        { () => setFilter(FILTER_COMPLETED) }
      </Subscribe>
    </Fragment>
  );
};
