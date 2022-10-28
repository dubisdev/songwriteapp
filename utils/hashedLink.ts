import { encode, decode } from "js-base64";
import debounce from "just-debounce";

export function getHashedContent(hash: string) {
  const [title = "", content = ""] = hash.split("|").map(decode);
  return { title, content };
}

export const contentToHashedURL = ({ title = "", content = "" }) => {
  const hash = `${encode(title)}|${encode(content)}`;
  return window.location.origin + "/" + hash;
};

export function updateHashedContent({ title = "", content = "" }) {
  if (!title && !content) return window.history.replaceState(null, "", `/`);
  const hashedContent = `${encode(title)}|${encode(content)}`;
  window.history.replaceState(null, "", `/${hashedContent}`);
}

export const getContentFromParams = ({ index }: { index?: string[] } = {}) => {
  const hashedContent = index?.[0] || "";

  const { title = "", content = "" } = getHashedContent(hashedContent);
  return { title, content };
};

export const debouncedUpdateHashedContent = debounce(updateHashedContent, 1500);
