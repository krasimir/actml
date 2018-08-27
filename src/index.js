import Dialect from './Dialect';

const d = new Dialect();

export const dialect = d.create.bind(d);
export const speak = d.speak.bind(d);