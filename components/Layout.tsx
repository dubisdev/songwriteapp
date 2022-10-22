import type { FC, ReactElement } from "react";

export const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return <div className="px-2 grid grid-cols-2 gap-2">{children}</div>;
};
