import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { Layout } from './components/layout/Layout';
import { Login } from './pages/login/Login.page'


function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Layout>
            <Login />
      </Layout>
    </ MantineProvider>
  )
}

export default App
