import React from "react";
import Table from "react-bootstrap/Table";

const initialData = [
  {
    id: 1,
    title: "test city hospital",
    date: "2024-05-10",
  },
  {
    id: 2,
    title: "test city hospital 2",  
    date: "2024-06-15",
  },
];

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",  
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleDateString("en-US", options);
};

const NoticeBoards = () => {
  return (
    <div>
      <div className="card mb-7 mt-2">
        <div className="card-header pb-0 px-10 border-0 bg-white">
          <h3 className="mb-0 title_sm">Notice Boards</h3>  
        </div>
        <div className="card-body py-3">
          <div className="table-responsive">
            <Table hover className="admin_table mt-4">
              <thead>
                <tr>
                  <th>TITLE</th>
                  <th>CREATED ON</th>
                </tr>
              </thead>
              <tbody>
                {initialData.length > 0 ? (
                  initialData.map((item) => (
                    <tr key={item.id}>
                      <td><a href="#">{item.title}</a></td>
                      <td>
                        <div className="badge bg-light-info">
                          {formatDate(item.date)}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center py-5">
                      <h4 className="mb-4">No data available</h4>
                      <span role="img" aria-label="sad face" className="fs-1">😞</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoards;