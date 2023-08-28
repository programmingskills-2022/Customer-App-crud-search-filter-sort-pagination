import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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

  function sortHandle(colNumber: number) {
    const newData = Object.assign([], data);
    const isSorted = !colLabels[colNumber].isSorted; //true: ascending , false: descending
    const colName = colLabels[colNumber].colName;

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

  const tableHead = (
    <tr className="text-xs md:text-2xl">
      {colLabels.map((colLabel, colIndex) => {
        return (
          <th
            className={`md:px-4 px-2 py-2 first:rounded-tl-xl last:rounded-tr-xl`}
            key={colIndex}
          >
            <div
              className={`flex gap-2 items-center hover:cursor-pointer 
              }`}
              onClick={() => sortHandle(colIndex)}
            >
              {colLabel.label}
              {renderColSortStyle(colIndex)}
            </div>
          </th>
        );
      })}
    </tr>
  );

  const tableBody = sortData.map((obj: Record<string, any>, i) => {
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
          >
            No Data Available!
          </td>
          <td className="md:px-4 px-2 py-2 rounded-br-xl"></td>
        </tr>
      )}
    </>
  );

  return (
    <div className="px-2 md:px-4 pb-8">
      <table className="w-full table-auto text-left">
        <thead className="bg-slate-400 text-slate-800">{tableHead}</thead>

        <tbody>{tableBody}</tbody>

        {tableSummery}
      </table>
    </div>
  );
}
