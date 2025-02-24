import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/UserAPI';
import { useUserContext } from '../../contexts/UserContext';
import { showToast } from '../../helpers/ToastHelper';
import { SIGNUP, BACK_TO_LANDING } from '../../constants';
import { User, APIResponse } from '../../interfaces/UserInterface';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

const Signup = () => {
  useUserContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response: any = await signup(data);
      console.log("response sihnup fn",response)
      if (response.status==200) {
        showToast("Signup Successful", "success");
        navigate("/login");
      } else {
        showToast(response.message || "Signup failed", "error");
      }
    } catch (error) {
      showToast("Signup failed. Please try again!", "error");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create an Account</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", { required: "Phone number is required" })} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          
          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: "Address is required" })} 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition duration-200"
          >
            {SIGNUP}
          </button>
        </form>
        
        <button
          onClick={handleBack}
          className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition duration-200"
        >
          {BACK_TO_LANDING}
        </button>
      </div>
    </div>
  );
};

export default Signup;
