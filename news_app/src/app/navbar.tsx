import {
  Link
} from 'react-router-dom';


const Navbar = () => {
  const menus = [
    { title: "News", path: "/" },
    { title: "News by Tag", path: "/" }
  ];

  return (
    <nav className="bg-white w-full border-b">
      <div className="flex items-center justify-between px-4 max-w-screen-xl mx-auto py-3 md:flex md:px-8">
        <Link to="/">
          <img src="logo.png" alt="Logo Image" className="h-12 object-contain object-center" />    
        </Link>
        <ul className="flex items-center flex-row space-x-6 space-y-0">
          {menus.map((item, idx) => (
            <li key={idx} className="text-gray-600 hover:text-slate-400 font-bold">
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <div>
          <a className="text-gray-600 hover:text-slate-400 font-bold" href="/login">Login</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;