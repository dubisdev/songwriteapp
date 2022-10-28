import { Editor } from "../../components/Editor";
import { Preview } from "../../components/Preview";
import { getContentFromParams } from "../../utils/hashedLink";

type HomeParams = {
  params?: { index?: string[] };
  searchParams?: { id: string };
};

const Home = ({ params }: HomeParams) => {
  const { title, content } = getContentFromParams(params);

  return (
    <div className="px-2 md:grid md:grid-cols-2 gap-2">
      <Editor content={content} title={title} />
      <Preview />
    </div>
  );
};

export default Home;
