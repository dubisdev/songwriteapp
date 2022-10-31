import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { encode } from "js-base64";

export default function empty() {
  return <></>;
}

const redirectTo = (path: string) => ({
  redirect: { destination: path },
  props: {},
});

export const getServerSideProps = withPageAuth({
  async getServerSideProps(ctx, supabase) {
    const { username, title } = ctx.params || {};

    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .filter("username", "eq", username);

    if (error || data.length === 0) return redirectTo("/");

    const userId = data[0].id;

    const { data: songData, error: err } = await supabase
      .from("lyrics")
      .select("title, content")
      .filter("owner", "eq", userId)
      .filter("title", "eq", title);

    if (err || songData?.length === 0) return redirectTo("/");

    const { title: songTitle, content: songContent } = songData[0];

    return redirectTo(`/${encode(songTitle)}|${encode(songContent)}`);
  },
});
