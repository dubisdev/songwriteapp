import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Editor } from "../components/Editor";
import { Layout } from "../components/Layout";
import { Preview } from "../components/Preview";

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const [songName, setSongName] = useState("Awesome Song Name 🎶");

  return (
    <div>
      <Head>
        <title>SongWrite.app</title>
        <meta name="description" content="Enjoy writting your letters!" />
      </Head>

      <h1 className="mb-5 text-3xl font-bold underline text-center">
        SongWrite.app
      </h1>
      <Layout>
        <>
          <Editor
            text={text}
            onChange={setText}
            songName={songName}
            setSongName={setSongName}
          />
          <Preview text={text} songName={songName} />
        </>
      </Layout>
    </div>
  );
};

export default Home;
