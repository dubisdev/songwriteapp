import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { GetServerSidePropsContext } from "next";
import { getUserLyrics, getUsernameId } from "../../utils/database";

type UserPageProps = {
  username: string;
  songs: any[];
};

export default function UserPage({ songs, username }: UserPageProps) {
  return songs.map((song) => (
    <a key={song.slug} href={`/${username}/${song.slug}`}>
      {song.title}
    </a>
  ));
}

const redirectTo = (path: string) => ({
  redirect: { destination: path },
  props: {},
});

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const { username } = ctx.params || {};

  if (username === "favicon.ico") return;

  const { data, error } = await getUsernameId(supabase, username as string);
  if (error || data.length === 0) return redirectTo("/");
  const userId = data[0].id;

  const { data: songData, error: err } = await getUserLyrics(supabase, userId);

  if (err || songData?.length === 0) return redirectTo("/");

  return {
    props: {
      username,
      songs: songData,
    },
  };
};
