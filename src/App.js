import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from "./containers/DefaultLayout/DefaultLayout";
import history from './utils/history';

const App = () => {
  return (
    <Router history={history}>
      <Routes>
        <Route path='*' name="Home" element={<DefaultLayout />} />
      </Routes>
    </Router>
  )
}

export default App;