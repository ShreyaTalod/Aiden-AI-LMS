import { useState } from "react";

export const useDropdown = (initial = false) => {
  const [open, setOpen] = useState(initial);
  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  const toggle = () => setOpen((s) => !s);
  return { open, show, hide, toggle, setOpen };
};
