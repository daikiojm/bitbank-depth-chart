import { Container } from '@mui/material';

import { AppProvider } from './providers/app';
import DepthChart from './components/DepthChart';

function App() {
  return (
    <AppProvider>
      <Container>
        <DepthChart />
      </Container>
    </AppProvider>
  );
}

export default App;
