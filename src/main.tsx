import ReactDOM from 'react-dom/client';
import App from './App';

import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-react-table/styles.css'; //import MRT styles
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
