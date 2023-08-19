/** @format */
"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDuration, formatNumber } from "@/app/utils/helpers";

const ArtistInfo = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData(id?: string) {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://artist-backend.onrender.com/api/v1/artist/${id}`
        );
        setData(response?.data?.data?.data);
        setLoading(false);
      } catch (error) {
      }
    }
    if (params?.id) {
      fetchData(params?.id);
    }
  }, [params?.id]);

  return (
    <main className="py-24 pl-12 flex items-center justify-center flex-col">
      <p className="my-6 text-[24px] text-grey-400">Artist View</p>
      <div
        className="bg-gray-100 w-[900px] h-[400px] flex shadow-md p-4 flex bg-cover no-repeat bg-center"
        style={{ backgroundImage: `url('${data?.artist?.picture_medium}')` }}
      >
        <div className="w-[50%]">
          <h1 className="text-[24px] text-white font-bold">
            {data?.artist?.name}
          </h1>
          <p className="text-white">
            <span className="font-bold">
              {formatNumber(data?.artist?.nb_fan)}
            </span>{" "}
            Fans
          </p>
        </div>

        <div className="w-[50%] bg-white rounded-md p-4">
          <p className="my-6 text-[16px] font-bold">Top tracks</p>
          <ul>
            {data?.topTracks?.data.map((item: any, indx: number) => (
              <li
                key={item.id}
                className="flex my-2 justify-between items-center"
              >
                <div>
                  <span>{indx + 1}. </span>
                  <span>{item?.title}</span>
                </div>
                <span>{formatDuration(item?.duration)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-[24px] text-grey-400 mt-16">Albums</p>
      <div className="grid grid-cols-4 w-[900px] mb-12 gap-4">
        {data?.allAlbums?.data.map((item: any) => (
          <div
            className="bg-white my-4 w-[200px] h-auto rounded-lg shadow-md"
            key={item.id}
          >
            <div className="relative w-[100%] h-[150px]">
              <Image src={item?.cover_medium} alt={"/img.jpg"} fill />
            </div>
            <div className="mt-5">
              <p className=" ml-2 text-[16px] font-bold">{item?.title}</p>
              <p className=" ml-2 text-[16px] text-grey-400">
                {item?.release_date?.split("-")[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ArtistInfo;
