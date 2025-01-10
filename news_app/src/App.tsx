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

import AdminLayout from '@/admin/layout';
import AdminIndex from '@/admin/index';

import ViewNewsItem from '@/admin/news_item/view';
import CreateNewsItem from '@/admin/news_item/create';
import UpdateNewsItem from '@/admin/news_item/update';

import AuthLayout from '@/app/auth/layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/" element={ <AdminLayout /> }>
          <Route index element={ <AdminIndex /> } />
          <Route path="news_items/:id" element={ <ViewNewsItem /> } />
          <Route path="news_items/create" element={ <CreateNewsItem /> } />
          <Route path="news_items/:id/update" element={ <UpdateNewsItem /> } />
        </Route>
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