import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';


import { useGeneralSettingStore } from './stores/generalSettings.store';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/login/Login.page'


import { useEffect } from 'react';
import { ColorSchemeEnum } from './models/generalSettings.models';

function App() {
  const generalSettingsStore = useGeneralSettingStore();
  
  useEffect(() => {
    setTimeout(() => {
      generalSettingsStore.setColorScheme(ColorSchemeEnum.DARK);
      console.log(generalSettingsStore.colorScheme);
    }, 3000);
  }, []);

  return (
    <MantineProvider defaultColorScheme={generalSettingsStore.colorScheme}>
      <Layout>
        <Login />
      </Layout>
    </ MantineProvider>
  )
}

export default App
