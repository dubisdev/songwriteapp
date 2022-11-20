import Head from "next/head";
import type { GetServerSideProps } from "next/types";
import { Editor } from "../components/Editor";
import { Preview } from "../components/Preview";
import ToolBox from "../components/ToolBox";
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

      <div className="px-2 md:grid md:grid-cols-2 gap-2 h-[80%]">
        <Editor content={content} title={title} />
        <Preview />
        <ToolBox />
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { title, content } = getContentFromParams(context.params);

  return {
    props: { title, content },
  };
};
