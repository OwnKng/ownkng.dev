import { useState } from "react";

export const useToggle = () => {
  const [isToggled, setToggle] = useState(false);

  const toggle = () => setToggle((prevState) => !prevState);
  const closeToggle = () => setToggle(false);

  return { isToggled, toggle, closeToggle };
};
