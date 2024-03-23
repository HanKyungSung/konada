import { IconMessageDots } from "@tabler/icons-react";
import {
  IconPlayerRecordFilled,
  IconThumbUp,
  IconEye,
  IconArrowLeft,
  IconArrowRight
} from "@tabler/icons-react";
import useDateDiffInDays from "../../../../hooks/useDateDiffInDays";

interface PostInfo {
  notice: {
    profilePictureURL: string;
    userId: string;
    boltPoint: number;
    tagTitle: string;
    hashTag: string[];
    views: number;
    thumbsUp: number;
    comments: number;
    noticeTitle: string;
    createdTime: string;
  }[];
  posts: {
    profilePictureURL: string;
    userId: string;
    boltPoint: number;
    tagTitle: string;
    hashTag: string[];
    views: number;
    thumbsUp: number;
    comments: number;
    postTitle: string;
    postContent: string;
    createdTime: string;
  }[];
}

interface Body {
  postInfo: PostInfo;
  sortList: string[];
}

const SubBodyPost: React.FC<Body> = ({ postInfo }) => {
  return (
    <div>
      <div className="subBodyPostNoticeContainer">
        {postInfo.notice.map((posts, index) => (
          <div key={posts.tagTitle + index}>
            <div className="subBodyPostNotice">
              <div className="postIconsLeft">
                <div className="userProfilePictureBackground">
                  <img
                    className="userProfilePicture"
                    src={posts.profilePictureURL}
                    alt=""
                  />
                </div>
                <span>{posts.userId}</span>
                <IconPlayerRecordFilled size={5}> </IconPlayerRecordFilled>
                <span>
                  {useDateDiffInDays(posts.createdTime)}
                  <span> Days Before</span>
                </span>
              </div>
              <div className="postSubBodyContent">
                {posts.noticeTitle.length > 50 ? (
                  <div>
                    {posts.noticeTitle.substring(0, 50)}
                    <span>...</span>
                  </div>
                ) : (
                  <div>{posts.noticeTitle}</div>
                )}
              </div>
              <div className="postSubBodyBottomRow">
                <div>
                  <button className="postSubBodyNoticeButton">Notice</button>
                  {posts.hashTag.map((hash, index) => (
                    <span key={hash + index}>{hash}</span>
                  ))}
                </div>
                <div className="postIconsRight">
                  <IconEye />
                  <span>{posts.views}</span>
                  <IconThumbUp></IconThumbUp>
                  <span>{posts.thumbsUp}</span>
                  <IconMessageDots></IconMessageDots>
                  <span>{posts.comments}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {postInfo.posts.map((post, index) => (
        <div key={post.boltPoint + index} className="subBodyPost">
          <div className="subBodyPostComment">
            <span>Answer</span>
            <span>{post.comments}</span>
          </div>
          <div className="subBodyPostContent">
            <div className="postIconsLeft">
              <div className="userProfilePictureBackground">
                <img
                  className="userProfilePicture"
                  src={post.profilePictureURL}
                  alt=""
                />
              </div>
              <span>{post.userId}</span>
              <IconPlayerRecordFilled size={5}> </IconPlayerRecordFilled>
              <span>
                {useDateDiffInDays(post.createdTime)}
                <span> Days Before</span>
              </span>
            </div>
            <div className="postSubBodyContent">
              {post.postTitle.length > 50 ? (
                <div>
                  {post.postTitle.substring(0, 50)}
                  <span>...</span>
                </div>
              ) : (
                <div>{post.postTitle}</div>
              )}
            </div>
            <div className="postSubBodyBottomRow">
              <div>
                <button className="postSubBodyNoticeButton">
                  {post.tagTitle}
                </button>
                {post.hashTag.map((hash, index) => (
                  <span key={index + hash}>{hash}</span>
                ))}
              </div>
              <div className="postIconsRight">
                <IconEye />
                <span>{post.views}</span>
                <IconThumbUp />
                <span>{post.thumbsUp}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="subBodyPaiginationBottom">
        <div className="subBodyPaiginationLeft">
          <IconArrowLeft color="lightgrey" />
          <span>Previous</span>
        </div>
        <div className="subBodyPaiginationMiddle">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>...</span>
          <span>13086</span>
        </div>
        <div className="subBodyPaiginationRight">
          <span>Next</span>
          <IconArrowRight />
        </div>
      </div>
    </div>
  );
};

export default SubBodyPost;
