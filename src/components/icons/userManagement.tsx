import clsx from "clsx";
import React from "react";

type Props = { selected: boolean };

const UserManagement = ({ selected }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
        className={clsx(
          "dark:group-hover:fill-[#C8C7FF] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#7540A9]",
          { "dark:!fill-[#C8C7FF] fill-[#7540A9] ": selected }
        )}
      />
      <path
        d="M6 18C6 15.7909 7.79086 14 10 14H14C16.2091 14 18 15.7909 18 18V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V18Z"
        className={clsx(
          "dark:group-hover:fill-[#9F54FF] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#BD8AFF] ",
          { "dark:!fill-[#7540A9] fill-[#BD8AFF]": selected }
        )}
      />
    </svg>
  );
};

export default UserManagement;
