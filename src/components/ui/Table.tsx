import { ChangeEvent, useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import Button from "./Button";

type Props = {
  data: CustomerVisibleCols[];
  keyField: string;
  colLabels: colLabel[];
  summeryVisible: boolean;
  calculatedFields: CalculatedField[];
  hasUpdateButton: boolean;
  hasDeleteButton: boolean;
  handleUpdate: (id: number) => void;
  handleDelete: (id: number) => void;
};

export default function Table({
  data,
  keyField,
  colLabels,
  summeryVisible,
  calculatedFields,
  hasUpdateButton,
  hasDeleteButton,
  handleUpdate,
  handleDelete,
}: Props) {
  const [sortData, setSortData] = useState<CustomerVisibleCols[]>([]);

  const itemsPerPageList = [5, 10, 20];
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState<number>(1);
  let startIndex;

  if (currentPage > 0) {
    startIndex = (currentPage - 1) * itemsPerPage;
  } else {
    startIndex = 0;
  }

  const endIndex = startIndex + itemsPerPage;
  const pageNumbers = Math.ceil(sortData?.length / itemsPerPage);

  if (currentPage > pageNumbers) setCurrentPage(pageNumbers);
  if (currentPage === 0 && currentPage < pageNumbers) setCurrentPage(1);

  const currentPageData = sortData.slice(startIndex, endIndex);

  const count = sortData.reduce((ac) => ac + 1, 0);

  useEffect(() => {
    setSortData(data);
  }, [data]);

  const findCalculatedField = (field: string) => {
    return calculatedFields.find(
      (calculatedField) => calculatedField.fieldIndex === field
    );
  };

  const resetColStyleAfterSort = (colNumber: number) => {
    colLabels.forEach((colLabel, i) => {
      if (i !== colNumber) colLabel.isSorted = false;
    });
  };

  function handleSort(colNumber: number) {
    const newData = Object.assign([], data);
    const isSorted = !colLabels[colNumber].isSorted; //true: ascending , false: descending
    const colName = colLabels[colNumber].colName;

    colLabels[colNumber].sortable &&
      setSortData(
        newData.sort((a, b) =>
          isSorted
            ? a[colName] > b[colName]
              ? 1
              : -1
            : a[colName] < b[colName]
            ? 1
            : -1
        )
      );

    colLabels[colNumber].isSorted = isSorted;
    resetColStyleAfterSort(colNumber);
  }

  const renderColSortStyle = (colNumber: number) => {
    return (
      <div
        className={`text-sm opacity-50 hidden ${
          colLabels[colNumber].sortable ? "md:block" : "md:hidden"
        }`}
      >
        {colLabels[colNumber].isSorted ? <FaChevronDown /> : <FaChevronUp />}
      </div>
    );
  };

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle last page click
  const handleLastPage = () => {
    if (currentPage !== pageNumbers) setCurrentPage(pageNumbers);
  };

  // Handle last page click
  const handleFirstPage = () => {
    if (currentPage !== 1) setCurrentPage(1);
  };

  const handleItemsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const currentPageNumber = Number(e.target.value);

    setItemsPerPage(currentPageNumber);
  };

  //table head columns
  const tableHead = (
    <tr className="md:text-xl">
      <div className="hidden md:contents">
        {colLabels.map((colLabel, colNumber) => {
          return (
            <th
              className={`md:px-4 px-2 py-2 first:rounded-tl-xl ${
                colLabel.widthcss
              } ${
                !(hasDeleteButton || hasUpdateButton) && "last:rounded-tr-xl"
              }`}
              key={colNumber}
            >
              <div
                className={`flex gap-2 items-center ${
                  colLabels[colNumber].sortable ? "hover:cursor-pointer" : ""
                } 
              }`}
                onClick={() => handleSort(colNumber)}
              >
                {colLabel.label}
                {renderColSortStyle(colNumber)}
              </div>
            </th>
          );
        })}
      </div>
      <th className="md:hidden md:px-4 px-2 py-2 rounded-tl-xl">
        informations
      </th>
      {(hasDeleteButton || hasUpdateButton) && (
        <th className="last:rounded-tr-xl text-center">Operations</th>
      )}
    </tr>
  );

  //include table rows's data
  const tableBody = currentPageData.map((obj: Record<string, any>, i) => {
    return (
      <>
        <tr
          key={i}
          className="md:hidden w-full bg-slate-100 border border-slate-300 odd:bg-slate-100 even:bg-slate-200"
        >
          <td className="md:px-4 px-2 py-2">
            {Object.keys(obj).map((key, i) => {
              const isExists = findCalculatedField(key);

              if (isExists === undefined) {
                return (
                  <div key={i}>
                    {key}: {obj[key]}
                  </div>
                );
              } else {
                return (
                  <div key={i} className="flex">
                    {key}: {isExists.calcFunc(obj[key])}
                  </div>
                );
              }
            })}
          </td>
          {(hasDeleteButton || hasUpdateButton) && (
            <td className="bg-slate-200 w-fit">
              <div className="flex py-2 gap-2 md:gap-4 items-center justify-center w-full">
                <Button
                  disabled={false}
                  classname="bg-blue-600 text-white px-2 md:px-4 rounded-xl hover:bg-blue-700"
                  onClick={() => handleUpdate(obj[keyField])}
                >
                  {hasUpdateButton && "Update"}
                </Button>
                <Button
                  disabled={false}
                  classname="bg-red-600/80 text-white px-2 md:px-4 rounded-xl hover:bg-red-700"
                  onClick={() => handleDelete(obj[keyField])}
                >
                  {hasDeleteButton && "delete"}
                </Button>
              </div>
            </td>
          )}
        </tr>
        <div className="w-full hidden md:contents">
          <tr
            key={i}
            className="w-full text-xs md:text-lg bg-slate-100 border border-slate-300 odd:bg-slate-100 even:bg-slate-200"
          >
            {Object.keys(obj).map((key) => {
              const isExists = findCalculatedField(key);

              if (isExists === undefined) {
                return (
                  <td className="md:px-4 px-2 py-2" key={key}>
                    {obj[key]}
                  </td>
                );
              } else {
                return isExists.calcFunc(obj[key]);
              }
            })}
            {(hasDeleteButton || hasUpdateButton) && (
              <td className="bg-slate-400 w-fit">
                <div className="flex py-2 gap-2 md:gap-4 items-center justify-center w-full">
                  <Button
                    disabled={false}
                    classname="bg-blue-600 text-white px-2 md:px-4 rounded-xl hover:bg-blue-700"
                    onClick={() => handleUpdate(obj[keyField])}
                  >
                    {hasUpdateButton && "Update"}
                  </Button>
                  <Button
                    disabled={false}
                    classname="bg-red-600/80 text-white px-2 md:px-4 rounded-xl hover:bg-red-700"
                    onClick={() => handleDelete(obj[keyField])}
                  >
                    {hasDeleteButton && "delete"}
                  </Button>
                </div>
              </td>
            )}
          </tr>
        </div>
      </>
    );
  });

  //last line of table
  const tableSummery = (
    <>
      {summeryVisible && count > 0 && (
        <tr className="text-sm font-bold md:text-xl bg-slate-400">
          <td
            //1 added for operation column
            colSpan={
              hasDeleteButton || hasUpdateButton
                ? colLabels.length + 1
                : colLabels.length
            }
            className={`md:px-4 px-2 py-2 rounded-bl-xl rounded-br-xl`}
            key={count + 1}
          >
            Total Record Count = {count}
          </td>
        </tr>
      )}
      {summeryVisible && count === 0 && (
        <tr className="text-xl bg-slate-100">
          <td
            colSpan={
              hasDeleteButton || hasUpdateButton
                ? colLabels.length
                : colLabels.length - 1
            }
            className={`md:px-4 px-2 py-2 rounded-bl-xl`}
            key={1}
          >
            No Data Available!
          </td>
          <td className="md:px-4 px-2 py-2 rounded-br-xl"></td>
        </tr>
      )}
    </>
  );

  const tableMobilePagination = (
    <div className="md:text-lg flex justify-between md:hidden my-2">
      <Button
        disabled={currentPage > 1 ? false : true}
        onClick={handlePrevPage}
        classname="px-4 py-2 bg-slate-100 rounded-xl hover:bg-slate-200"
      >
        Prev
      </Button>
      <Button
        disabled={currentPage < pageNumbers ? false : true}
        onClick={handleNextPage}
        classname="px-4 py-2 bg-slate-100 rounded-xl hover:bg-slate-200"
      >
        Next
      </Button>
    </div>
  );

  const tablePagination = (
    <div className="hidden md:flex justify-between items-center my-4">
      <div className="flex gap-2 items-center text-sm md:text-lg">
        <p>Show</p>
        <select
          className="bg-slate-200 rounded-xl w-24 text-center py-2 outline-none"
          value={itemsPerPage}
          onChange={handleItemsChange}
        >
          {itemsPerPageList.map((itemsNumberPerPage) => (
            <option key={itemsNumberPerPage}>{itemsNumberPerPage}</option>
          ))}
        </select>
        <p>
          entries ( Page {currentPage} of {pageNumbers} )
        </p>
      </div>
      <div className="md:flex">
        {/* go to first page */}
        <Button
          disabled={currentPage === 1 ? true : false}
          onClick={handleFirstPage}
          classname="inline-flex items-center p-2 border rounded-bl-xl rounded-tl-xl border-gray-300 bg-white text-sm font-medium text-gray-500 hover:enabled:bg-gray-100"
        >
          <FaAngleDoubleLeft />
        </Button>
        {/* go to previous page */}
        <Button
          disabled={currentPage > 1 ? false : true}
          onClick={handlePrevPage}
          classname="inline-flex items-center px-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:enabled:bg-gray-100"
        >
          <FaAngleLeft />
        </Button>
        {/* go to next page */}
        <Button
          disabled={currentPage < pageNumbers ? false : true}
          onClick={handleNextPage}
          classname="inline-flex items-center p-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:enabled:bg-gray-100"
        >
          <FaAngleRight />
        </Button>
        {/* go to last page */}
        <Button
          disabled={currentPage === pageNumbers ? true : false}
          onClick={handleLastPage}
          classname="inline-flex items-center p-2 border rounded-br-xl rounded-tr-xl border-gray-300 bg-white text-sm font-medium text-gray-500 hover:enabled:bg-gray-100"
        >
          <FaAngleDoubleRight />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full px-2 md:px-4 pb-8">
      <table className="w-full table-auto text-left">
        <thead className="bg-slate-400 text-slate-800">{tableHead}</thead>

        <tbody>
          {tableBody}
          {tableSummery}
        </tbody>
      </table>

      {/* pageing */}
      {tableMobilePagination}
      {tablePagination}
    </div>
  );
}
