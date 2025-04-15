import React from "react";

interface NoDataFoundProps {
  colSpan?: number;
}

const NoDataFound: React.FC<NoDataFoundProps> = ({ colSpan = 100 }) => {
  return (
    <tr className="no-data-row">
      <td className="text-center py-5" colSpan={colSpan}>
        <div className="d-flex flex-column align-items-center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-3"
          >
            <circle cx="32" cy="32" r="30" fill="#F5F5F5" />
            <path
              d="M20 26C22.2091 26 24 24.2091 24 22C24 19.7909 22.2091 18 20 18C17.7909 18 16 19.7909 16 22C16 24.2091 17.7909 26 20 26Z"
              fill="#AFAFAF"
            />
            <path
              d="M44 26C46.2091 26 48 24.2091 48 22C48 19.7909 46.2091 18 44 18C41.7909 18 40 19.7909 40 22C40 24.2091 41.7909 26 44 26Z"
              fill="#AFAFAF"
            />
            <path
              d="M20 42C27.732 42 34 38.418 34 34H14C14 38.418 20.268 42 28 42H20Z"
              fill="#AFAFAF"
              transform="rotate(180 24 38)"
            />
          </svg>
          <span className="text-muted fs-5">No data found</span>
        </div>
      </td>
    </tr>
  );
};

export default NoDataFound;     