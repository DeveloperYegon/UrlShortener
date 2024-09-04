import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const UrlShortener = () => {
  const { register, handleSubmit, reset } = useForm();
  const [history, setHistory] = useState([]);

  const shortenUrl = (data) => {
    // Example logic for shortening the URL
    const shortenedUrl = `https://short.ly/${Math.random().toString(36).substring(2, 8)}`;
    const dateTime = new Date().toLocaleString();

    // Add the new shortened URL to the history
    setHistory([
      ...history,
      { originalUrl: data.link, shortenedUrl, dateTime }
    ]);

    reset(); // Reset form after submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit(shortenUrl)}>
        <input
          className='p-1 border border-slate-600 w-full rounded-xl'
          type="text"
          id="link"
          name="link"
          placeholder='Enter link'
          {...register("link", { required: "Link is required" })}
        />
        <button type="submit" className='mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg'>
          Shorten URL
        </button>
      </form>

      {/* Display the history of shortened URLs */}
      {history.length > 0 && (
        <div className='mt-6'>
          <h2 className='text-lg font-semibold'>Recently Shortened URLs</h2>
          <table className='w-full mt-4 border-collapse border border-slate-400'>
            <thead>
              <tr>
                <th className='border border-slate-300 px-4 py-2'>Original URL</th>
                <th className='border border-slate-300 px-4 py-2'>Shortened URL</th>
                <th className='border border-slate-300 px-4 py-2'>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td className='border border-slate-300 px-4 py-2'>{item.originalUrl}</td>
                  <td className='border border-slate-300 px-4 py-2'>
                    <a href={item.shortenedUrl} target="_blank" rel="noopener noreferrer">
                      {item.shortenedUrl}
                    </a>
                  </td>
                  <td className='border border-slate-300 px-4 py-2'>{item.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
