import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next/types";
import { Editor } from "../components/Editor";
import { Preview } from "../components/Preview";
import { getContentFromParams } from "../utils/hashedLink";

type HomeParams = { params?: { index?: string[] } };

const Home = ({ title = "", content = "" }) => {
  const SEOTitle = title || "A powerful tool for Songwriters 🎶";

  return (
    <>
      <Head>
        <title>{`SongWrite.app - ${SEOTitle}`}</title>
        <meta
          name="description"
          content="Songwriting app for the web 🎶. Transpose and share your lyrics and chords with just one click."
        />
      </Head>

      <h1 className="p-4 mb-5 text-3xl font-bold underline text-center">
        <span id="title">SongWrite.app</span>
      </h1>

      <div className="px-2 md:grid md:grid-cols-2 gap-2">
        <Editor content={content} title={title} />
        <Preview />
      </div>
    </>
  );
};

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { index: ["test"] } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { title, content } = getContentFromParams(context.params);

  return {
    props: { title, content },
  };
};
