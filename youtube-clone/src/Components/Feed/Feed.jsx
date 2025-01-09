import "./Feed.css";

import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import { useEffect, useState } from "react";


const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

    await fetch(videoList_url)
      .then((res) => res.json())
      .then((data) => setData(data.items));
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item) => (
        <Link
          to={`video/${item.snippet.categoryId}/${item.id}`}
          className="card"
          key={item.id}
        >
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>{value_converter(item.s)} &bull; 2 days ago</p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
