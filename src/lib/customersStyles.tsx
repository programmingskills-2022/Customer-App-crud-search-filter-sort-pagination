export default function getStatus(status: boolean) {
  const statusText = status ? "Active" : "Not Active";
  const activeColor = status ? "bg-green-500" : "bg-red-500";
  return (
    <td>
      <p className={`${activeColor} rounded-xl text-center w-16 md:w-24`}>
        {statusText}
      </p>
    </td>
  );
}
