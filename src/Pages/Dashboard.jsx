import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { IoCopy } from "react-icons/io5";



function Dashboard() {
  const [shortLink, setShortLink] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const [errorMessages, setErrorMessages] = useState('');
  const textRef = useRef(null);

  // Function to copy the text
  const copyToClipboard = () => {
    textRef.current.select();
    document.execCommand('copy');
    alert('Text copied to clipboard!');
  };
  

  const onSubmit = (data) => {
    axios.post(
      "https://api-ssl.bitly.com/v4/shorten",
      {
        long_url: data.link,
      },
      {
        headers: { Authorization: `349f9f9f9a2f536ead93da39a93f33463fce3392` },
      }
    )
    .then((response) => {
      setShortLink(response.data.link);
      setErrorMessages("");
      alert("URL Shortened Successfully");
    })
    .catch((err) => {
      alert("An error occurred during the process");
      setErrorMessages(err.response?.data?.message || 'An unexpected error occurred');
      console.log(err);
    });
  };

  return (
    <main className='md:m-5 m-2 bg-[#182B5C] p-2 h-[100vh] md:p-5'>
      <section className='border md:m-5 rounded-xl bg-white border-slate-950 h-full md:p-4'>
        {errorMessages && (
          <div id="authmessage" className='text-center' style={{ color: 'red' }}>
            {errorMessages}
          </div>
        )}

        <p className='text-center text-[#ED7D3B] p-3 text-2xl'>URL SHORTENER</p>
        <hr className='h-1 bg-black m-auto' />

        {/* URL shortening form */}
        <form className='border border-slate-950 rounded flex items-center justify-evenly md:flex-row flex-col md:p-5 md:m-5 m-2 p-2' onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='flex flex-col w-full'>
            <div className='w-full'>
              <input
                className={`p-1 border w-full rounded-xl ${errors.link ? 'border-red-600' : 'border-slate-600'}`}
                type="text"
                id="link"
                name="link"
                placeholder='Enter link'
                {...register("link", {
                  required: "Link is required",
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                    message: "Enter a valid URL"
                  }
                })}
              />
            </div>
            <div className='w-full'>
              <p className='text-red-500 text-center text-[12px]'>
                {errors.link?.message}
              </p>
            </div>
          </div>
          <input className='bg-[#ED7D3B] p-2 rounded-xl m-3' type="submit" value="Shorten URL" />
        </form>

        {/* Shortened URL */}
        <div className='border md:m-5 m-2 rounded-xl bg-white border-slate-950'>
          <p className='text-center m-2'>Shortened URL:</p>
          <hr className='h-1 bg-black w-[80%] m-auto' />
          <div className='flex justify-center m-3'>
            <input
              ref={textRef}
              type="text"
              value={shortLink}
              className='p-1 border border-slate-200 rounded-xl'
              readOnly
            />
            <button className='bg-[#ED7D3B] p-2 flex items-center rounded-xl m-3' onClick={copyToClipboard}><span><IoCopy /></span>Copy</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
