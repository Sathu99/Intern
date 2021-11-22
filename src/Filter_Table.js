// src/components/filter.table.js
import React from "react";

import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
} from "react-table";

import {
  Col,
  Row,
  Form,
  InputGroup,
  Table,
  Button,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBackward,
  faForward,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <>
      <Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col xs={12} md={3} lg={3} xl={3}>
            <Form.Group className="mb-0">
              <Form.Label
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h5> Search in Table</h5>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={value || ""}
                  onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }}
                  placeholder={`${count} records...`}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </div>
      </Row>

      {/* <span>
      Search:{" "}
      <input
        className="form-control"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span> */}
    </>
  );
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    // <Row className="justify-content-between align-items-center">
    //   <Col xs={12} md={3} lg={3} xl={3}>
    <Row>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col xs={12} md={6} lg={6} xl={7}>
          <Form.Group className="mb-0">
            <InputGroup size="sm">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={filterValue || ""}
                onChange={(e) => {
                  setFilter(e.target.value || undefined);
                }}
                placeholder={`Search ${count} records...`}
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </div>
    </Row>
    //   </Col>
    // </Row>

    // <input
    //   className="form-control"
    //   value={filterValue || ""}
    //   onChange={(e) => {
    //     setFilter(e.target.value || undefined);
    //   }}
    //   placeholder={`Search ${count} records...`}
    // />
  );
}

function Filter_Table({ columns, data, tHead }) {
  const defaultColumn = React.useMemo(
    () => ({
      // Default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <Table striped bordered hover className="mt-4" {...getTableProps()}>
        <thead style={{ backgroundColor: tHead }}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  style={{
                    fontSize: "0.8em",
                    textAlign: "center",
                    color: "black",
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="h6"
                      style={{ fontSize: "1em", textAlign: "center" }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ul className="pagination">
        <li className="page-item" style={{ paddingRight: "5px" }}>
          <Button
            className="m-1"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            size="sm"
            variant="dark"
          >
            First Page
          </Button>{" "}
        </li>
        <li className="page-item" style={{ paddingRight: "5px" }}>
          <Button
            className="m-1"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            size="sm"
            variant="outline-success"
          >
            <FontAwesomeIcon icon={faBackward} className="me-2" />
            Go Pevious
          </Button>
        </li>
        <li className="page-item" style={{ paddingRight: "5px" }}>
          <Button
            className="m-1"
            onClick={() => nextPage()}
            disabled={!canNextPage}
            size="sm"
            variant="outline-success"
          >
            Go Next &nbsp; <FontAwesomeIcon icon={faForward} className="me-2" />
          </Button>
        </li>
        <li className="page-item" style={{ paddingRight: "5px" }}>
          <Button
            className="m-1"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            variant="dark"
            size="sm"
          >
            Last Page
          </Button>
        </li>
        <li style={{ paddingRight: "5px" }}>
          <Button className="m-1" size="sm" variant="light">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </Button>
        </li>
        <li style={{ paddingRight: "5px" }}>
          <Button className="m-1" size="sm" variant="outline-primary">
            Go To Page No :
            <input
              className="form-control"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "115px", height: "20px" }}
            />
          </Button>
        </li>

        <select
          className="form-control"
          size="sm"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          style={{ width: "135px", height: "38px" }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize} Rows
            </option>
          ))}
        </select>
      </ul>
    </>
  );
}

export default React.memo(Filter_Table);
