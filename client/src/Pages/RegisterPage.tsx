/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import Buttons from '../components/partial/Button';
import { registerUser } from '../services/CoffeeAPI';

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const bg_img = '/images/coffeebean_logo.png';
  const navigate = useNavigate();
  const {
      register,
      handleSubmit,
      setError,
      formState: {isSubmitting, errors, isValid },
    } = useForm<FormValues>({
      mode: "onChange"
    });
  
    const handleErrors = (errors: any) => {
        if (errors) {
            errors.forEach((error: string) => {
                if (error.includes('Password')) {
                    setError('password', { message: error })
                } else if (error.includes('Email')) {
                    setError('email', { message: error })
                } else if (error.includes('Username')) {
                    setError('username', { message: error })
                }
            });
        }
    }


const handleOnSubmit = async (data: any) => {
   
    try {
        const { username, email, password } = data;
    
        await registerUser({ username, email, password });
    
        navigate("/konto/logga-in");
    } catch (error: any) {
        if (error.response.status === 400) {
          const errors = error.response.data.errors;
          const errorMessages = errors.map((error: { [key: string]: string }) => error[key]);
          const message = errorMessages.join(', ');
          alert(message);
        } else {
          console.error(error);
          handleErrors(error)
        }
    }
    
    };

  return (
    <div className=" p-4 h-[calc(94vh-148px)] w-full bg-deep-brown bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(/images/Login_bg_1920X1080px.jpg)' }}>
      <div className="container mx-auto h-full flex flex-1 justify-center items-center">
        <div className="w-full max-w-sm md:max-w-md m-auto p-10 bg-deep-brown bg-opacity-90 rounded-lg shadow-xl">
          <img src={bg_img} alt="logo kaffebönans skafferi" className="m-auto mb-4 max-w-[10em]" />
          <h1 className="font-heading text-white text-center font-bold uppercase">Skapa konto</h1>
          <form className="" 
          onSubmit={handleSubmit((data) => handleOnSubmit(data))}
          >
            <div className={`mb-4`}>
              <label className="block mb-1 text-sm text-white">Användarnamn</label>
              <input
                className={ `${errors.username ?' border-2 border-red-600' : ''} w-full px-5 py-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white`}
                type="text"
                id="username"
                placeholder="Ditt användarnamn.."
                aria-label="username"
                {...register('username', { required: 'Måste fylla i användarnamn' })}
              />
              {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>}
            </div>

            <div className={`mb-4`}>
              <label className="block mb-1 text-sm text-white">E-post</label>
              <input
                className={ `${errors.email ?' border-2 border-red-600' : ''} w-full px-5 py-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white`}
                type="text"
                id="email"
                placeholder="Din e-post.."
                aria-label="email"
                {...register('email', { 
                    required: 'Måste fyll i e-post',
                    pattern: {
                        value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
                        message: 'Eposten är inte giltig'
                    }
                })}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div className={`mt-2`}>
              <label className="block mb-1 text-sm text-white">Lösenord</label>
              <input
                className={`w-full px-5 py-2 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white 
                ${errors.password ? 'border-2 border-red-600' : ''}`}
                type="password"
                id="password"
                placeholder="*********"
                aria-label="password"
                {...register('password', { 
                    required: 'Måste fylla i löseonord',
                    pattern: {
                        value: /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                        message: 'Lösenorder måste innehålla minst 6 tecken'
                    } 
                })}
              />
                <div>
                {errors.password && <p className="text-sm text-red-500 mt-1">{(errors.password).message}</p>}
                </div>

            </div>

            <div className="mt-8 items-center flex justify-between mb-4">
            <Buttons
                typeAction="submit"
                buttonType='loginOrRegister'
                disabled={isSubmitting || !isValid}
                isLoading={isSubmitting}
                // onClick={handleSubmit(onSubmitRegister)}
            >
                Skapa konto
            </Buttons>

              <NavLink
                className="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-light-tan"
                to="/#"
              >
                Glömt lösenord?
              </NavLink>
            </div>

            <div className="text-center mt-4">
              <NavLink
                to="/konto/logga-in"
                className="inline-block right-0 align-baseline font-light text-md text-white hover:text-light-tan"
              >
                Har du redan ett konot? Logga in
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;
