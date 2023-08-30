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
  colLabels: colLabel[];
  summeryVisible: boolean;
  calculatedFields: CalculatedField[];
};

export default function Table({
  data,
  colLabels,
  summeryVisible,
  calculatedFields,
}: Props) {
  const [sortData, setSortData] = useState<CustomerVisibleCols[]>([...data]);

  const itemsPerPageList = [5, 10, 20];
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageNumbers = Math.ceil(sortData?.length / itemsPerPage);
  if (currentPage > pageNumbers) setCurrentPage(pageNumbers);

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

  const tableHead = (
    <tr className="text-xs md:text-xl">
      {colLabels.map((colLabel, colNumber) => {
        return (
          <th
            className={`md:px-4 px-2 py-2 first:rounded-tl-xl last:rounded-tr-xl`}
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
    </tr>
  );

  const tableBody = currentPageData.map((obj: Record<string, any>, i) => {
    return (
      <tr
        key={i}
        className="text-xs md:text-lg bg-slate-100 border border-slate-300 odd:bg-slate-100 even:bg-slate-200"
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
      </tr>
    );
  });

  const tableSummery = (
    <>
      {summeryVisible && count > 0 && (
        <tr className="text-sm font-bold md:text-xl bg-slate-400">
          <td
            colSpan={colLabels.length}
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
            colSpan={colLabels.length - 1}
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
            <option>{itemsNumberPerPage}</option>
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
    <div className="px-2 md:px-4 pb-8">
      <table className="w-full table-auto text-left">
        <thead className="bg-slate-400 text-slate-800">{tableHead}</thead>

        <tbody>{tableBody}</tbody>

        {tableSummery}
      </table>

      {/* pageing */}
      {tableMobilePagination}
      {tablePagination}
    </div>
  );
}
