import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import AddPost from "../components/AddPost";
import Post from "../components/Post";
import styles from "../styles/Home.module.css";
import { IPost } from "../types";

const API_URL: string = "https://jsonplaceholder.typicode.com/posts";

export default function IndexPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [postList, setPostList] = useState(posts);

  const addPost = async (e: FormEvent, formData: IPost) => {
    e.preventDefault();
    const post: IPost = {
      id: Math.random(),
      title: formData.title,
      body: formData.body,
    };

    setPostList((curr) => [post, ...curr]);
  };

  const deletePost = (id: number) => {
    const _postList = postList.filter((post) => post.id !== id);

    setPostList(_postList);
  };

  if (!postList) return <h1>Loading...</h1>;

  return (
    <div className={"container"}>
      <main className={styles.main}>
        <h1> My Posts </h1>
        <AddPost savePost={addPost} />

        {postList.map((post: IPost) => (
          <Post key={post.id} deletePost={deletePost} post={post} />
        ))}
      </main>

      <footer className={styles.footer}></footer>

      <style jsx>
        {`
          .container {
            background-color: red;
          }
        `}
      </style>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(API_URL);

  const posts: IPost[] = await res.json();

  return {
    props: {
      posts,
    },
  };
}
