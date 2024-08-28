import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";

function Dashboard() {
  // Destructure the form methods and states
  const [shortLink, setShortLink] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const [errorMessages, setErrorMessages] = useState('');

  const onSubmit = (data) => {
    axios.post('http://localhost:3000/link', data)
      .then((response) => {
        console.log(response);
        console.log(response.data.link);
       shortLink = setShortLink(response.data.link);
        if (response.status === 201) {
          setErrorMessages(""); // Clear error messages
        } else {
          setErrorMessages("Shortening the URL failed. Please try again.");
        }
      })
      .catch((err) => {
        alert("An error occurred during the process");
        setErrorMessages(err.response?.data?.message || 'An unexpected error occurred');
        console.log(err);
      });
  };
  return (
    <main className='md:m-5 m-2 bg-[#182B5C] p-2 md:p-5'>
      <section className='border md:m-5 rounded-xl bg-white border-slate-950 h-full md:p-4'>
        {errorMessages && (
          <div id="authmessage" className='text-center' style={{ color: 'red' }}>
            {errorMessages}
          </div>
        )}

        <p className='text-center text-[#ED7D3B] p-3 text-2xl'>SHORTEN URL</p>
        <hr className='h-1 bg-black  m-auto' />

        {/* URL shortening form */}
        <form className='border border-slate-950 rounded flex  items-center justify-evenly md:flex-row flex-col p-5 m-5' onSubmit={handleSubmit(onSubmit)} noValidate>
          
          <div className='flex flex-col'>
            <div>
            <input
              className='p-1 border border-slate-600 rounded-xl '
              type="text"
              id="link"
              name="link"
              placeholder='Enter link'
              {...register("link", {
                required: "Link is required"
              })}
            />
            </div>
            <div>

            <p className='text-red-500 text-center text-[12px]'>

              {errors.link?.message}
            </p>
            </div>
          </div>

          <input className='bg-[#ED7D3B] p-2 rounded-xl m-3' type="submit" value="Shorten URL" />
        </form>
        <div className='border md:m-5 rounded-xl bg-white border-slate-950 h-full'>
            <p className='border md:m-5 rounded-xl bg-white border-slate-950 h-full md:p-4'>shortened url {shortLink} </p>       
       </div>
      </section>
    </main>
  );
}

export default Dashboard;
