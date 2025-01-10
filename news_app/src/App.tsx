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

import NewsItemsIndex from '@/admin/news_items/index';
import ViewNewsItem from '@/admin/news_items/view';
import CreateNewsItem from '@/admin/news_items/create';
import UpdateNewsItem from '@/admin/news_items/update';

import AuthLayout from '@/app/auth/layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={ <AdminLayout />}>
          <Route index element={ <AdminIndex /> } />
          <Route path="news_items">
            <Route index element={ <NewsItemsIndex /> } />
            <Route path=":id" element={ <ViewNewsItem /> } />
            <Route path="create" element={ <CreateNewsItem /> } />
            <Route path=":id/update" element={ <UpdateNewsItem /> } />
          </Route>
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