import { Container } from '@mui/material';

import { AppProvider } from './providers/app';
import TopNavigation from './components/TopNavigation';
import DepthChart from './components/DepthChart';
import Footer from './components/Footer';

function App() {
  return (
    <AppProvider>
      <TopNavigation />
      <Container sx={{ pt: 2, mb: 'auto', flex: 1, }}>
        <DepthChart />
      </Container>
      <Footer sx={{ position: 'absolute', bottom: 0 }} />
    </AppProvider>
  );
}

export default App;