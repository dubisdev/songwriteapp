import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Editor } from "../components/Editor";
import { Layout } from "../components/Layout";
import { Preview } from "../components/Preview";

const Home: NextPage = () => {
  const [text, setText] = useState("");
  const [songName, setSongName] = useState("");

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
