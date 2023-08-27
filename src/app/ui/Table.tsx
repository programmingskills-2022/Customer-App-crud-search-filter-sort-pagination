type Props = {
  data: CustomerVisibleCols[];
  colLabels: string[];
  summeryVisible: boolean;
  calculatedFields: CalculatedField[];
};

export default function Table({
  data,
  colLabels,
  summeryVisible,
  calculatedFields,
}: Props) {
  const count = data.reduce((ac) => ac + 1, 0);

  const findCalculatedField = (field: string) => {
    return calculatedFields.find(
      (calculatedField) => calculatedField.fieldIndex === field
    );
  };

  return (
    <div className="px-2 md:px-4 pb-8">
      <table className="w-full table-auto text-left">
        <thead className="bg-slate-400 text-slate-800">
          <tr className="text-xs md:text-2xl">
            {colLabels.map((colLabel, i) => {
              return (
                <th
                  className={`md:px-4 px-2 py-2 first:rounded-tl-xl last:rounded-tr-xl`}
                  key={i}
                >
                  {colLabel}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((obj: Record<string, any>, i) => {
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
          })}
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
        </tbody>
      </table>
    </div>
  );
}
