import React from 'react';
import ReactDom from 'react-dom';

function App() {
  return <p>Hello World!</p>;
}

ReactDom.render(<App />, document.getElementById('root') as HTMLElement);
