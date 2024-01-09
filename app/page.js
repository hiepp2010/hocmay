  "use client"
  import React, { useState,useEffect } from "react";
import FormData from "form-data";
import axios from "axios";

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

const fileToDataURL = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};

const dataURLtoFile = (dataURL, fileName) => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};


const ChooseImage = (props) => {
  const { display,setDisplay,selectedImage, setSelectedImage } = props;
  useEffect(()=>{},[selectedImage])

  return (
    <div className="w-1/2 pr-4">
      <h1 className="text-2xl font-bold mb-4">Choose Image</h1>

      {selectedImage && (
        <div className="mb-4">
          {display&&(<img
            alt="not found"
            className="w-105 h-auto mb-2"
            src={URL.createObjectURL(selectedImage)}
            width={"1200px"}
          />)}
          <br />

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

const ResponseBox = ({ responseData }) => {
  return (
    <div className="w-full mt-4">
      <div className="bg-gray-200 p-4">
        <h1 className="text-xl font-bold mb-2">Response Data</h1>
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
      </div>
    </div>
  );
};




const App = () => {
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [url1,setUrl1]=useState(null)
  const [url2,setUrl2]=useState(null)
  const [display1,setDisplay1]=useState(1)
  const [display2,setDisplay2]=useState(1)

  const delet=()=>{
    setDisplay1(1)
    setDisplay2(1)
    setSelectedImage1(null)
    setSelectedImage2(null)
    setUrl1(null)
    setUrl2(null)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setResponseData("")
    const formData = new FormData();
    formData.append("img_front", selectedImage1);
    formData.append("img_back", selectedImage2);
    //const a=URL.createObjectURL(selectedImage1)
    //const b=URL.createObjectURL(selectedImage2)
    setUrl1(URL.createObjectURL(selectedImage1))
    setUrl2(URL.createObjectURL(selectedImage2))
    localStorage.setItem("a",URL.createObjectURL(selectedImage1))
    localStorage.setItem("b",URL.createObjectURL(selectedImage2))
    setDisplay1(null)
    setDisplay2(null)
    console.log(selectedImage1)

    try {
      const response = await axios.post("http://localhost:8003/ocr", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponseData(response.data);
    //  await setUrl1(localStorage.getItem("a")
     // await setUrl2("b")
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
          <div className="flex">
            <ChooseImage
              selectedImage={selectedImage1}
              setSelectedImage={setSelectedImage1}
              display={display1}
              setDisplay={setDisplay1}
             
            />
            <ChooseImage
              selectedImage={selectedImage2}
              setSelectedImage={setSelectedImage2}
              display={display2}
              setDisplay={setDisplay2}
            />
          </div>
          <button
             onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            name="upload"
          >
            Submit
          </button >
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={delet}
          >
            Remove
          </button>
        {responseData && <ResponseBox responseData={responseData} />}
        <div className="flex">
        {url1&&<div className="w-1/2 pr-4"><img
            alt="not found"
            className="w-105 h-auto mb-2"
            src={url1}
            width={"1200px"}
          /></div>}
          {url2&&<div className="w-1/2 pr-4"><img
            alt="not found"
            className="w-50  h-auto mb-2"
            src={url2}
            width={"1200px"}
          /></div>}
        </div>
        
      </div>
    </div>
  );
};

export default App; 