/** @format */
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { range } from "lodash";
import { useRouter } from "next/navigation";
import { formatDuration } from "./utils/helpers";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(false);
const router = useRouter()

  useEffect(() => {
    async function fetchData(value: string) {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://artist-backend.onrender.com/api/v1/artist/track/?search=${value}`
        );
        setData(response?.data?.data?.data);
        setLoading(false);
      } catch (error) {
      }
    }
    if (searchVal) {
      fetchData(searchVal);
    }
  }, [searchVal]);

  return (
    <main className="flex flex-col items-center py-24">
      <h1 className="text-center text-[48px] font-bold">Welcome</h1>
      <p className="text-center my-6 text-[24px] text-grey-400">
        Kindly search for your favorite track
      </p>

      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-[40rem] px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button className="absolute right-0 top-0 mt-2 mr-3">
        </button>
      </div>
      {loading ? (
        <div className="grid grid-cols-3 gap-12">
        {range(6).map((item: any, indx: number) => (
          <div
            className="bg-gray-300 my-4 px-4 py-4 w-[400px] h-[500px] rounded-lg shadow-md animate-pulse"
            key={indx}
          >
            <div className="relative w-[100%] h-[300px] animate-pulse bg-gray-100"/>
            <div className="mt-5">
              <p className=" ml-2 text-[14px] h-8 w-16 text-grey-400 animate-pulse bg-gray-100"/>
              <p className=" ml-2 text-[24px] my-4 h-8 w-32 font-bold animate-pulse bg-gray-100"/>
              <p className=" ml-2 text-[16px] h-8 w-24 text-grey-400 animate-pulse bg-gray-100"/>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="grid grid-cols-3 gap-12">
          {data.map((item: any, indx: number) => (
            <div
              className="bg-white my-4 px-4 py-4 w-[400px] h-auto rounded-lg shadow-md"
              key={indx}
            >
              <div className="relative w-[100%] h-[300px]">
                <Image src={item?.album?.cover_medium} alt={"image"} fill />
              </div>
              <div className="mt-5">
                <p className=" ml-2 text-[14px] text-grey-400">{formatDuration(item?.duration)}</p>
                <p className=" ml-2 text-[24px] font-bold">{item.title}</p>
                <p className=" ml-2 text-[16px] text-grey-400 cursor-pointer" onClick={()=> router.push(`/artist/${item.artist.id}`)}>By {item?.artist?.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}