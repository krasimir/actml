/* eslint-disable react/prop-types, max-len */
import React from 'react';
import { render, act } from '@testing-library/react';

import actml from '../index';

const delay = (time) => new Promise(done => setTimeout(done, time));
const cleanHTML = html => html.toString().trim().replace(new RegExp('\\n', 'gi'), '').replace(new RegExp(' {2}', 'g'), '');
const exerciseHTML = (container, expectation) => {
  expect(cleanHTML(container.innerHTML)).toEqual(cleanHTML(expectation));
};

describe('Given the ActML library', () => {
  describe('when rendering an ActML element', () => {
    it('should call my function', () => {
      const mock = jest.fn();
      const A = actml(mock);

      render(<A />);

      expect(mock).toBeCalledTimes(1);
    });
    it('should render the result of `render` call', () => {
      const mock = jest.fn().mockImplementation(({ render }) => {
        render(<p>Foo</p>);
        render(<p>Bar</p>);
        render(<p>Hello world</p>);
      });
      const A = actml(mock);
      const { getByText } = render(<A />);

      expect(mock).toBeCalledTimes(1);
      expect(getByText('Hello world')).toBeDefined();
    });
  });
  describe('when we want to render children', () => {
    it('should pass the `children` prop down to our function', () => {
      const B = ({ children }) => {
        return <p>{ children }</p>;
      };
      const A = actml(({ children, render }) => {
        render(<B>{ children }</B>);
      });
      const { container } = render(<A>Hello world</A>);

      exerciseHTML(container, '<p>Hello world</p>');
    });
  });
  describe('when we use an async function', () => {
    it('should allow us to render multiple times', async () => {
      const A = actml(async ({ render }) => {
        act(() => render('Hello'));
        await delay(20);
        act(() => render('world'));
      });

      const { queryByText, getByText } = render(<A />);

      expect(getByText('Hello')).toBeDefined();
      await delay(21);
      expect(queryByText('Hello')).toBe(null);
      expect(getByText('world')).toBeDefined();
    });
  });
});
