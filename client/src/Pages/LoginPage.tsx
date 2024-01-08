import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Login } from "../services/CoffeeAPI";

const LoginPage = () => {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const [ error, setError ] = useState("")

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUsernameChange = (event: any) => {
        event.preventDefault();
        setValues({ ...values, username: event.target.value });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handlePasswordChange = (event: any) => {
        event.preventDefault();
        setValues({ ...values, password: event.target.value });
    };


    const bg_img = '/images/coffeebean_logo.png'

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
      
        try {
          const response = await Login(values);
          // Handle the response accordingly based on your API structure
          if (response.success) {
            console.log("Login successful");
            // Redirect or perform other actions for successful login
          } else {
            setError("Invalid credentials. Please try again.");
          }
        } catch (error) {
          console.error("Error when trying to login", error);
          setError("An error occurred during login. Please try again.");
        }
      };
      

  return (
    <div className="h-[calc(94vh-148px)] w-full bg-gray-900 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(/images/Login_bg_1920X1080px.jpg)' }}>
      <div className="container mx-auto h-full flex flex-1 justify-center items-center">
        <div className="w-full max-w-sm md:max-w-lg m-auto p-10 bg-deep-brown bg-opacity-90 rounded-lg shadow-xl">
            <img src={bg_img} alt="logo kaffebönans skafferi" className="m-auto mb-4 max-w-[10em]"/>
            <h1 className="font-heading text-white text-center font-bold uppercase">Logain</h1>
          <form className="" onSubmit={handleSubmit}>
            
            <div className="">
              <label className="block mb-1 text-sm text-white">Användarnamn</label>
              <input
                className="w-full px-5 py-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                type="text"
                id="username"
                placeholder="Ditt användarnamn.."
                aria-label="username"
                onChange={handleUsernameChange}
              />
            </div>

            <div className="mt-2">
              <label className="block mb-1 text-sm text-white">Lösenord</label>
              <input
                className="w-full px-5 py-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                type="password"
                id="password"
                placeholder="*********"
                aria-label="password"
                onChange={handlePasswordChange}
                value={values.password}
              />
            </div>

            <div className="mt-8 items-center flex justify-between mb-4">
              <button className="px-4 py-2 text-white font-light tracking-wider bg-orange hover:opacity-80 rounded" type="submit">Logga in</button>
              <NavLink className="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-light-tan" to="/#">Glömt lössenord?</NavLink>
            </div>

            <div className="text-center mt-4">
              <NavLink to="/register" className="inline-block right-0 align-baseline font-light text-md text-white hover:text-light-tan">
                Registrera konto?
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
