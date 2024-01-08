import { NavLink } from "react-router-dom";

const SignedInMenu = () => {
    
    return (
        <div className='absolute top-ful right-0 mt-4 z-20 w-auto overflow-hidden bg-deep-brown rounded-md shadow-xl'>
        <NavLink to="#" className="flex items-center p-3 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300  hover:bg-orange hover:text-white">
            <div className="mx-1">
                <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Du är inlogad som</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">janedoe@exampl.com</p>
            </div>
        </NavLink>

        <hr className="border-gray-200 dark:border-orange " />
        
        <NavLink to="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300  hover:bg-orange hover:text-white">
            view profile
        </NavLink>


        <NavLink to="#" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300  hover:bg-orange hover:text-white">
             Logga in 
        </NavLink>
    </div>
    );
}

export default SignedInMenu;