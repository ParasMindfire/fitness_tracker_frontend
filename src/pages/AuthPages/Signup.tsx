import { useState } from "react";
import { signup } from "../../services/UserAPI";
import { User } from "../../interfaces/UserInterface";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../helpers/ToastHelper";
import { SIGNUP,BACK_TO_LANDING} from "../../constants";


//This page allows new users to create an account.
const Signup = () => {
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  //handles form changes of signup input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //handles submit of signup and navigates to login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response:any= await signup(form);
      if (response.status==200) {
        showToast("Signup Successful","success");
        navigate("/login");
      } else {
        setError(response.message || "Signup failed!");
      }
    } catch (error) {
      showToast("Signup Failed","error");
      setError("Signup failed. Please try again!");
    }
  };

  //handles navigation to dashboard
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create an Account</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
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
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition duration-200"
          >
            {SIGNUP}
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

export default Signup;
