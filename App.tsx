import React from 'react';
import { Provider } from 'react-redux';
import store from '@/store';
import AppNavigation from '@/navigation';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
