import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Login from '@/app/auth/login/page';
import Register from '@/app/auth/register/page';

import AppLayout from '@/app/layout';
import Index from '@/app/index';
import BrowseTags from '@/app/browse_tags/page';
import NewsItem from '@/app/news_item/page';

import AuthLayout from '@/app/auth/layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <AppLayout /> }>
          <Route index element={ <Index /> } />
          <Route path="/browse_tags" element={ <BrowseTags /> } />
          <Route path="/news_item/:id" element={ <NewsItem /> }/>
        </Route>
        <Route path="/" element={ <AuthLayout /> }>
          <Route path="/login" element={ <Login />} />
          <Route path="/register" element={ <Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;