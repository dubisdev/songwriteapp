import { getContentFromParams } from "../../utils/hashedLink";

type HeadParams = {
  params: { index?: string[] };
  searchParams: { id: string };
};

export default function Head({ params }: HeadParams) {
  if (params.index?.[0] === "favicon.ico") return;

  const { title } = getContentFromParams(params);

  return (
    title && (
      <>
        <title>{`SongWrite.app - ${title}`}</title>
      </>
    )
  );
}
