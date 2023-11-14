import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

import { Layout } from './pages/layout/Layout.page';
import { Login } from './pages/login/Login.page'

function App() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider defaultColorScheme="auto">
        <Layout>
          <Login />
        </Layout>
      </ MantineProvider>
    </>
  )
}

export default App
