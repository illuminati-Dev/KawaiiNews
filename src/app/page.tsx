"use client";
import Navbar from "./Navbar";
import { topNews } from "@/lib/fetchNews";
import { useEffect, useState } from "react";
import { NewsComponent } from "@/components/page";
import { usePathname } from "next/navigation";

export default function Home() {
  const [topStory, setTopStory] = useState([]);
  const [counts, setCounts] = useState(6);
  const [loading, setLoading] = useState(false);

  const fetchTopStory = async () => {
    const res = await topNews(counts);
    setTopStory(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchTopStory();
  }, [counts]);

  const handleBtnClick = () => {
    setLoading(true);
    setCounts(counts + 3);
  };

  const currentPath = usePathname();

  return (
    <>
      {currentPath === "/" && <NewsComponent newsType="Top Stories" newsData={topStory} />}
      <div className="flex justify-center">
        {loading ? (
          <button
            type="button"
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded shadow-md"
            disabled
          >
            <div className="spinner-border h-5 w-5 mr-3 border-t-2 border-white"></div>
            Loading....
          </button>
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
            onClick={handleBtnClick}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}
