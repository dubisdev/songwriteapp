import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { encode } from "js-base64";
import { getSongByKey, getUsernameId } from "../../../utils/database";

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

    const { data, error } = await getUsernameId(supabase, username as string);
    if (error || data.length === 0) return redirectTo("/");
    const userId = data[0].id;

    const songKey = { userId, songName: title as string };

    const { data: songData, error: err } = await getSongByKey(
      supabase,
      songKey
    );

    if (err || songData?.length === 0) return redirectTo("/");

    const { title: songTitle, content: songContent } = songData[0];

    // TODO - Instead of redirecting we can just render the page with the song data and allow the user to edit it and save it
    // TODO - Add a button "Create New Song" that will redirect to the editor page with a new song
    // TODO - Add a button "Delete Song" that will delete the song from the database
    // TODO - If the user is not the owner of the song, they should not be able to edit it, just see it (maybe add a button to fork it)
    return redirectTo(`/${encode(songTitle)}|${encode(songContent)}`);
  },
});
