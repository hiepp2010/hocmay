  "use client"
  import React, { useState } from "react";
  import FormData from "form-data"
  import axios from "axios"

  const Navbar = () => {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold">My App</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  };

  const ChooseImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
      <div className="w-1/2 pr-4">
        <h1 className="text-2xl font-bold mb-4">Choose Image</h1>

        {selectedImage && (
          <div className="mb-4">
            <img
              alt="not found"
              className="w-105 h-auto mb-2"
              src={URL.createObjectURL(selectedImage)}
              width={"1200px"}
            />
            <br />
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setSelectedImage(null)}
            >
              Remove
            </button>
          </div>
        )}

        <input
          type="file"
          name="myImage"
          className="mb-4"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
          }}
        />
      </div>
    );
  };

  const ImageDetail = ({ selectedImage }) => {
    return (
      <div className="w-1/2 pl-4">
        <div className="bg-gray-200 p-4">
          <h1 className="text-xl font-bold mb-2">Image Details</h1>
          {selectedImage ? (
            <div>
              <p>File Name: {selectedImage.name}</p>
              <p>File Size: {selectedImage.size} bytes</p>
              <p>File Type: {selectedImage.type}</p>
            </div>
          ) : (
            <p>No image selected</p>
          )}
        </div>
      </div>
    );
  };



  const App = () => {
    const [selectedImage1, setSelectedImage1] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const handleSubmit=async (e)=>{
      e.preventDefault();
      const formData = new FormData();
      //formData.append('file', [selectedImage1,selectedImage2]);
      formData.append("file", selectedImage1);
      formData.append("img_back", selectedImage2);
      try {
        const response = await axios.get("http://localhost:8003/data",{
          headers: {
            "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*",
          },});
        const uploadedImage = response.data;
        console.log(uploadedImage);
      } catch (error) {
        console.error(error);
      }
    }
    return (
      <div>
        <Navbar />
        <div className="container mx-auto mt-8">
          <form onSubmit={handleSubmit}>
          <div className="flex">
            <ChooseImage
              selectedImage={selectedImage1}
              setSelectedImage={setSelectedImage1}
            />
            <ChooseImage
              selectedImage={selectedImage2}
              setSelectedImage={setSelectedImage2}
            />
          </div>
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          name="upload"
        >
          Submit
          </button>
          </form>
        </div>
      </div>
    );
  };

  export default App;