import { Editor } from "../../components/Editor";
import { Layout } from "../../components/Layout";
import { Preview } from "../../components/Preview";
import { getHashedContent } from "../../utils/hashedLink";

type HomeParams = {
  params: { index?: string[] };
  searchParams: { id: string };
};

const Home = ({ params }: HomeParams) => {
  const hashcontent = params.index?.[0] || "";

  const { title, content } = getHashedContent(hashcontent);

  return (
    <>
      <h1 className="p-4 mb-5 text-3xl font-bold underline text-center">
        <span id="title">SongWrite.app</span>
      </h1>

      <Layout>
        <>
          <Editor content={content} title={title} />
          <Preview />
        </>
      </Layout>
    </>
  );
};

export default Home;
