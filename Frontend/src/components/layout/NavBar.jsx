import { NavLink } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';

function pathFor(category) {
  return category === 'Home' ? '/' : `/${category.toLowerCase()}`;
}

function NavBar() {
  const { categories } = useContent();

  return (
    <nav className="flex bg-white border-b border-gray-200 shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center gap-1 overflow-x-auto whitespace-nowrap">
          {categories.map((category) => (
            <li key={category} className="shrink-0 hover:bg-slate-200">
              <NavLink
                to={pathFor(category)}
                end
                className={({ isActive }) =>
                  `inline-block px-3 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-b-4 border-black  text-black'
                      : 'text-gray-800 hover:bg-white-100'
                  }`
                }
              >
                {category}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;