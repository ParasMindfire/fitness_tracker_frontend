import { useState } from 'react';
import { login } from '../services/UserAPI';
import { useUserContext } from '../contexts/UserContext';
import { LoginData } from '../interfaces/types';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState<LoginData>({ email: '', password: '' });
  const { setUser } = useUserContext();
  const [error,setError]=useState<string|null>(null)

  const navigate=useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response:any= await login(form);
      if (response.status==200) {
        console.log("login data ",response);
        setUser(response.user);
        localStorage.setItem("token",response.token);
        navigate("/");
      } else {
        alert(response.message || "Login failed!");
      }
    } catch (error) {
      setError("Login Failed !!")
    }
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
