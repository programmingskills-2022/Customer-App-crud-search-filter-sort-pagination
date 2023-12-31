export default function ChangeBooleanStatus(status: boolean) {
  const statusText = status ? "Active" : "Not Active";
  const activeColor = status ? "bg-green-500" : "bg-red-500";
  return (
    <td>
      <p className={`${activeColor} rounded-xl text-center px-4 w-fit`}>
        {statusText}
      </p>
    </td>
  );
}
