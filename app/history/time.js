"use client"
import Image from "next/image";
import Navbar from "../navBar.js";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto my-4 p-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ngày bắt đầu
            </label>
            <DatePicker className="border rounded w-full py-2 px-3" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ngày kết thúc
            </label>
            <DatePicker className="border rounded w-full py-2 px-3" />
          </div>
        </LocalizationProvider>
      </div>
    </>
  );
}
