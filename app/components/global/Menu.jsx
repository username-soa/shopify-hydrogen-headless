import {NavLink} from 'react-router-dom';

const Menu = ({links}) => {
  return (
    <div className="min-h-[300px] left-0 right-0 absolute top-[80] flex 2xl:container w-full mx-auto pt-2 px-4 sm:px-6 md:px-20 lg:px-32">
      <div className="bg-white w-full rounded-md shadow-sm grid grid-cols-[auto_1fr] p-4 gap-4">
        <div className="flex flex-col gap-2">
          <h4 className="text-gray-500 px-2 text-sm">Flavors</h4>
          {links.map((link, index) => {
            return (
              <NavLink
                to={link.to}
                prefetch="intent"
                key={`menu-link-${index}`}
                className={({isActive}) =>
                  isActive
                    ? 'p-2 flex items-center font-semibold bg-orange-200 rounded-md'
                    : 'hover:bg-orange-200 p-2 flex items-center font-semibold rounded-md'
                }
              >
                {link.title}
              </NavLink>
            );
          })}
        </div>
        <div className="bg-green-400"></div>
      </div>
    </div>
  );
};

export default Menu;
