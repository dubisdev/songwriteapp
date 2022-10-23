import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Editor } from "../components/Editor";
import { Layout } from "../components/Layout";
import { Preview } from "../components/Preview";
import { getHashedContent } from "../utils/hashedLink";
import { useStore } from "../utils/state";

type HomeParams = { title: string; content: string };

const Home: NextPage<HomeParams> = ({ title = "", content = "" }) => {
  const [setSongName, setText] = useStore((s) => [s.setSongName, s.setText]);

  useEffect(() => {
    setSongName(title);
    setText(content);
  }, [content, title]);

  return (
    <div>
      <Head>
        <title>SongWrite.app</title>
        <meta
          name="description"
          content="A simple songwriting app for the web 🎶"
        />
      </Head>

      <h1 className="p-4 mb-5 text-3xl font-bold underline text-center">
        <span id="title">SongWrite.app</span>
      </h1>

      <Layout>
        <>
          <Editor />
          <Preview />
        </>
      </Layout>
    </div>
  );
};

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { index: ["test"] } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<HomeParams> = async (context) => {
  const [hashcontent] = (context.params?.index as string[]) || [""];

  const { title, content } = getHashedContent(hashcontent as string);

  return {
    props: { title, content },
  };
};
