import axios from 'axios';
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form';



// định nghĩa kiểu dữ liệu khi dùng tsx
type FormValue = {
    email: string;
    password: string;
}

export const Login = () => {
    // hidden password
    const [showPassword, setShowPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [token, setToken] = useState<string>("");

    // khởi tạo React Hook Form với kiểu FormValue, register là hàm dùng để theo dõi các input
    const { register, handleSubmit } = useForm<FormValue>();

    //hàm xử lý submit form, với data với kiểu FormValue
    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        try {
            // gọi api login
            const res = await axios.post("https://reqres.in/api/login",
                {
                    email: data.email,
                    password: data.password,
                },
                {
                    headers: {
                        "x-api-key": "reqres-free-v1" // API Key
                    }
                }
            )

            setToken(res.data.token) // lưu token vào state
            setErrorMessage("") // xóa thông báo lỗi nếu có
            console.log("Token", res.data.token) // in token ra console
            alert("Login success!") // thông báo đăng nhập thành công
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data?.error || "Login failed");
            } else {
                setErrorMessage("Unexpected error");
            }
            setToken(""); // xóa token nếu có lỗi
        }
    }


    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='w-[90%] md:w-[40%] p-5 pt-0 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-slate-500 shadow-lg'>
                <div className='py-4 px-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-bl-3xl rounded-br-3xl'>
                    <h2 className='text-white font-bold text-2xl md:text-3xl'>Welcome Back</h2>
                </div>


                <form className='w-[90%] mt-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-4 relative '>
                        <label htmlFor="email" className='text-white'>Email</label>
                        <input type="email" id='email' placeholder='your email' {...register("email", { required: "Email không được để trống" })}
                            className="w-full mt-2 p-2 pr-16 rounded-md bg-gray-600 text-white focus:outline-none border-b-2 border-transparent focus:border-white"
                        />
                        <i className="fa-solid fa-envelope absolute right-3 top-[72%] -translate-y-1/2 text-white pointer-events-none text-xl"></i>
                    </div>
                    <div className='mt-4 relative'>
                        <label htmlFor="password" className='text-white'>Password</label>
                        <input type={showPassword ? "text" : "password"} placeholder='your password' {...register("password", { required: "Password không được để trống" })}
                            className="w-full p-2 pr-16 rounded-md mt-2 bg-gray-600 text-white focus:outline-none border-b-2 border-transparent focus:border-white" />
                        <i
                            className={`absolute right-3 top-[72%] -translate-y-1/2 text-white cursor-pointer text-sm ${showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}`}
                            onClick={() => setShowPassword(!showPassword)}
                        ></i>
                    </div>
                    <div className='mt-8 flex items-center justify-between'>
                        <label htmlFor="remember" className='text-white flex items-center gap-2'>
                            <input type="checkbox" id='remember' />
                            Remember me
                        </label>
                        <a
                            href="#"
                            className="text-sm text-white hover:underline hover:text-gray-200 transition duration-200"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Hiển thị lỗi nếu có */}
                    {errorMessage && <div className='mt-4 text-red-400 text-sm'>{errorMessage}</div>}

                    <div className='mt-8 flex justify-center'>
                        <button className='w-[30%] bg-blue-500 p-2 rounded-md text-white font-bold hover:bg-blue-800 duration-300'>Login</button>
                    </div>

                    {/* Hiển thị token khi đăng nhập thành công */}
                    {token && <div className='mt-4 text-green-400 text-sm text-center'>Login thành công! Token: {token}</div>}

                </form>
            </div>
        </div>
    )
}
