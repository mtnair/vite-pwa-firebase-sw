import { useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
  useRegisterSW({
    immediate: true,
    onRegisteredSW: async (_swScriptUrl, registration) => {
      console.log('Vite-Plugin-PWA Service Worker registered:', _swScriptUrl, registration);

      if (registration) {
        setInterval(() => {
          console.log('Service worker update check');
          registration.update();
        }, 60 * 1000); // every 60 seconds
      }
    },
    onRegisterError: (err) => {
      console.error('Error during service worker registration:', err);
    },
    onOfflineReady: () => {
      console.log('App is offline-ready');
    },
    onNeedRefresh: () => {
      console.log('App needs to be refreshed');
    },
  });

  const [count, setCount] = useState(1);

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
