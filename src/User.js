import React, { useState } from "react";
import Filter_Table from "./Filter_Table";

const user_column = [
  {
    Header: "User ID",
    accessor: "id",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "User Name",
    accessor: "username ",
  },
  {
    Header: "Email ID",
    accessor: "email ",
  },
];

export default function User() {
  const [users, setUsers] = useState([]);

  const userList = () => {};

  return (
    <div>
      <Filter_Table columns={user_column} data={users} tHead={"lightblue"} />{" "}
    </div>
  );
}
