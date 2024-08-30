import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { usePostsStore } from "@store/index";
import { RoutePath } from "@model/baseTypes";
import Loader from "@core/Loader";
import PostItem from "../PostItem";

import s from "./PostsList.module.scss";

const PostsList = () => {
  const { postsLoadingInitial, loadPosts, posts } = usePostsStore();

  useEffect(() => {
    if (!posts.length) {
      loadPosts();
    }
  }, [loadPosts, posts]);

  return (
    <>
      {postsLoadingInitial ? (
        <Loader />
      ) : (
        <div className={s.PostsList}>
          {posts.map(({ id, title, tags, body }) => (
            <Link
              key={id}
              className={s.PostsList__link}
              to={RoutePath.POST_ITEM.replace(":id", String(id))}
            >
              <PostItem title={title} tags={tags} body={body} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default PostsList;
