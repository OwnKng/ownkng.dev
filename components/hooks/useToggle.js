import { useState } from "react";

export const useToggle = () => {
  const [isToggled, setToggle] = useState(false);

  const toggle = () => setToggle((prevState) => !prevState);
  return { isToggled, setToggle, toggle };
};
