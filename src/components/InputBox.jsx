import React, { useState } from 'react';
import { IoSendSharp  } from "react-icons/io5";
import { BiImageAdd } from "react-icons/bi";
import { MdMicNone } from "react-icons/md";

const InputBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center w-full max-w-[600px] mx-auto">
      <div className="relative flex items-center w-full">
        <input type="text" value={message} onChange={handleInputChange} className="flex-grow p-2 pr-16 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-400" placeholder="Type your message..."/>
        <MdMicNone className="absolute right-20 w-8 h-8 cursor-pointer" />
        <BiImageAdd className="absolute right-12 w-8 h-8 cursor-pointer" />
        <button type="submit" className="absolute right-4 flex items-center">
          <IoSendSharp className="text-xl" />
        </button>
      </div>
    </form>

  );
};

export default InputBox;
