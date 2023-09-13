import { useContext } from "react";
import Button from "./Button";
import { TableContext } from "@/context/TableContext";
import { TiDelete } from "react-icons/ti";

type Props = {
  onDeleteClick: () => void;
  onCancelClick: () => void;
};

export default function ConfirmDelete({ onDeleteClick, onCancelClick }: Props) {
  const { handleCrudStatus } = useContext(TableContext);

  return (
    <div className="absolute top-10 flex flex-col items-center justify-center mx-auto bg-slate-100 rounded-xl w-1/2 p-4">
      <div className="flex items-center justify-center pb-8">
        <span>
          <TiDelete className="w-16 h-16 text-red-700" />
        </span>
        <p>This customer information will be deleted, Are you sure?</p>
      </div>
      <div className="flex gap-4">
        <Button
          classname="bg-slate-700 text-white/80 hover:bg-slate-800 px-4 py-2 rounded-xl"
          disabled={false}
          onClick={onDeleteClick}
        >
          Delete
        </Button>
        <Button
          classname="bg-slate-200 border border-slate-400 hover:border-slate-800 px-4 py-2 rounded-xl"
          disabled={false}
          onClick={onCancelClick}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
