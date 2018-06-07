import React from 'react';
import Table from '../components/Table';

export default {
  test: ({ tagName }) => tagName === 'table',
  converter: () => children => <Table>{children}</Table>,
};
