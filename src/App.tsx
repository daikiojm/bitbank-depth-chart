import { Container } from '@mui/material';

import { AppProvider } from './providers/app';
import TopNavigation from './components/TopNavigation';
import DepthChart from './components/DepthChart';

function App() {
  return (
    <AppProvider>
      <TopNavigation />
      <Container sx={{ pt: 2 }}>
        <DepthChart />
      </Container>
    </AppProvider>
  );
}

export default App;