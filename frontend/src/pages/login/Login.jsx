import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { BASE_URL } from '../../../config.js'
import { useAuthContext } from '../../components/context/AuthContext.jsx'
import '../login/Login.css'


const Login = () => {
    const [data,setData] = useState({
        email:'',
        password:''
    })

    const {setauthUser} =  useAuthContext()
    const navigate = useNavigate()

    console.log(data);



    const handleSubmit = async(e)=>{
        e.preventDefault()

        try {
            

            const res = await fetch(`${BASE_URL}/auth/login`,{
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                    body:JSON.stringify(data)
                    
                })
          
          
                const result = await res.json()
                console.log('result',result.token);
          
                if(!res.ok){
                  throw new Error(result.message)
                }
                toast.success(result.message)
                navigate('/')

                localStorage.setItem("chat-user", JSON.stringify({ email: data.email, password: data.password, token: result.token, userId:result.userid, profilePic: result.image , username:result.username }));
                setauthUser({ email: data.email, password: data.password, token: result.token, userId:result.userid ,profilePic:result.image, username:result.username });


            
        } catch (error) {
            toast.error(error.message)
            console.log(error.message);
            
        }


    }

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Email</span>
                        </label>
                        <input type='email' placeholder='Enter the email' className='w-full input input-bordered h-10'value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} />


                      
                    </div>

                    <div >
                    <label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
                        <input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
                            value={data.password}
                            onChange={(e)=>setData({...data,password:e.target.value})}/>
                    </div>
                    <Link to='/signup' className='text-base text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                    {"Don't"} have a account ?
                        </Link> 
                        <button className='btn btn-block hover:bg-blue-700'>Login</button>
                </form>
                </div>
                </div>
  )
}

export default Login