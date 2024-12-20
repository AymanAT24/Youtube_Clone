import React, { useEffect, useState } from "react";
import "./Recommented.css";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";
const recommended = ({ categoryId, videoId }) => {
  const [categoryApiData, setCategoryApiData] = useState([]);

  const fetchCategoryData = async () => {
    const categoryData_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=EG&CategoryId=${categoryId}&key=${API_KEY}`;

    try {
      const response = await fetch(categoryData_url);
      const data = await response.json();
      if (Array.isArray(data.items)) {
        setCategoryApiData(data.items);
      } else {
        setCategoryApiData([]);
      }
    } catch (error) {
      console.error("Error fetching  data:", error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [categoryId]);

  console.log(categoryApiData);

  return (
    <div className="recommended">
      {categoryApiData.length > 0 ? (
        categoryApiData.map((item, index) => (
          <Link
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            key={index}
            className="side--list"
          >
            <img
              src={item.snippet?.thumbnails.medium.url}
              alt={item.snippet?.title}
            />
            <div className="side--info">
              <h4>{item.snippet?.title}</h4>
              <p>{item.snippet?.channelTitle}</p>
              <p>{value_converter(item.statistics?.viewCount)} Views</p>
            </div>
          </Link>
        ))
      ) : (
        <p>Loading recommended s...</p>
      )}
    </div>
  );
};

export default recommended;
