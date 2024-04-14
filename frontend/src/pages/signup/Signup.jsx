import { Link,useNavigate } from "react-router-dom";
import GenderCheckbox from "./GendercheckBox";
import {toast} from 'react-toastify'
import { useState } from "react";
import { BASE_URL } from "../../../config.js";


const SignUp = () => {
    const[input,setInput]= useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        gender:""

    })

	const navigate = useNavigate()

const handleChangeboxChange = (gender)=>{
	setInput({...input,gender})
}
	
const formSubmithandler=async(e)	=>{
	e.preventDefault()
 
	try {

		const res = await fetch(`${BASE_URL}/auth/signup`,{
			method:'post',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify(input)
		})

		const {message} = await res.json()
		if(!res.ok){
			throw new Error(message)
		}
		toast.success(message)
		navigate('/login')
		
	} catch (error) {
		toast.error(error.message)
		console.log("Error from signup",error.message);
		
	}

}
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={formSubmithandler}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text' >Username</span>
						</label>
						<input type='text' placeholder='Enter the name' className='w-full input input-bordered  h-10' value={input.username} onChange={(e)=>setInput({...input,username:e.target.value})} />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Email</span>
						</label>
						<input type='email' placeholder='Enter the email' className='w-full input input-bordered h-10'value={input.email} onChange={(e)=>setInput({...input,email:e.target.value})} />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={input.password} onChange={(e)=>setInput({...input,password:e.target.value})}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
							value={input.confirmPassword} onChange={(e)=>setInput({...input,confirmPassword:e.target.value})}
						/>
					</div>

					
                   <GenderCheckbox onCheckBoxchange={handleChangeboxChange} selectedGender={input.gender}/>
					<Link to='/login' className=' text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700 hover:bg-red-500'>Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;