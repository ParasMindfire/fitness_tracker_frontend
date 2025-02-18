import { useState } from 'react';
import { login } from '../../services/UserAPI';
import { useUserContext } from '../../contexts/UserContext';
import { LoginData } from '../../interfaces/UserInterface';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../helpers/ToastHelper';
import { LOGIN,BACK_TO_LANDING } from '../../constants';

// This page allows users to log into their account.
const Login = () => {
  const [form, setForm] = useState<LoginData>({ email: '', password: '' });
  const { setUser } = useUserContext();
  const [error,setError]=useState<string|null>(null)

  const navigate=useNavigate();

  //handles form input of login
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //handles submit and sets token 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response:any= await login(form);
      if (response.status==200) {
        setUser(response.user);
        localStorage.setItem("token",response.token);
        showToast("Login Successful","success");
        navigate("/");
      } else {
        showToast("Login Failed","error");
      }
    } catch (error) {
      setError("Login Failed !!")
    }
  };

  //handles navigation to dashboard
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input 
            type='email' 
            name='email' 
            placeholder='Email' 
            onChange={handleChange} 
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition duration-200"
          >
            {LOGIN}
          </button>
        </form>

        <button
          onClick={handleBack}
          className="w-96 mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition duration-200"
        >
          {BACK_TO_LANDING}
        </button>
      </div>
    </div>
  );
};

export default Login;
