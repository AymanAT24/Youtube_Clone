import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";

import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiVideoData, setApiVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchvideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    try {
      const response = await fetch(videoDetails_url);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setApiVideoData(data.items[0]);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchchannelData = async () => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiVideoData?.snippet.channelId}&key=${API_KEY}`;
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;

    try {
      const response = await fetch(channelData_url);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setChannelData(data.items[0]);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    } finally {
      setLoading(false);
    }
    try {
      const response = await fetch(comment_url);
      const data = await response.json();
      setCommentData(data?.items);
    } catch (error) {
      console.error("Error fetching video data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchvideoData();
  }, [videoId]);

  useEffect(() => {
    fetchchannelData();
  }, [apiVideoData]);
  // console.log(commentData);

  if (loading) {
    return <p>Loading video data...</p>;
  }

  if (!apiVideoData) {
    return <p>Video data not available.</p>;
  }

  return (
    <div className="play-video">
      {/* Video Player */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      {/* Video Title */}
      <h3>{apiVideoData.snippet?.title || "No title available"}</h3>

      {/* Video Info */}
      <div className="play-video-info">
        <p>
          {value_converter(apiVideoData?.statistics.viewCount || 0)} Views
          &bull; {moment(apiVideoData?.snippet.publishedAt).fromNow()}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {value_converter(apiVideoData?.statistics.likeCount)}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />

      {/* Publisher Info */}
      <div className="publisher">
        <img src={channelData?.snippet.thumbnails.default.url} alt="" />
        <div>
          <p>{apiVideoData?.snippet.channelTitle}</p>
          <span>
            {value_converter(channelData?.statistics.subscriberCount)}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>

      {/* Video Description */}
      <div className="vid-description">
        <p>{apiVideoData?.snippet.description.slice(0, 250)}</p>
        <p>Subscribe GreatStack to watch more Tutorials on web development</p>
        <hr />
        <h4>
          {value_converter(apiVideoData?.statistics.commentCount)} comments
        </h4>
        {commentData?.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img
                src={
                  item?.snippet.topLevelComment.snippet.authorProfileImageUrl
                }
                alt=""
              />
              <div>
                <h3>
                  {item?.snippet.topLevelComment.snippet.authorDisplayName}
                  <span>
                    {moment(
                      item?.snippet.topLevelComment.snippet.publishedAt
                    ).fromNow()}
                  </span>
                </h3>
                <p>{item?.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_converter(
                      item?.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
