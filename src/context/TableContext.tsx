"use client";
import { createContext, ReactNode, useState } from "react";

type CrudStatus = {
  isAdd: boolean;
  isUpdate: boolean;
  isDelete: boolean;
};

type ContextType = {
  activeRecord: number;
  hasUpdateButton: boolean;
  hasDeleteButton: boolean;
  isConfirmdelete: boolean;
  close: boolean;
  crudStatus: CrudStatus;
  handleHasUpdateButton: (hasUpdateButton: boolean) => void;
  handleHasDeleteButton: (hasDeleteButton: boolean) => void;
  handleIsConfirmdelete: (isConfirmdelete: boolean) => void;
  handleClose: () => void;
  handleCrudStatus: (crudStatus: CrudStatus) => void;
  handleActiveRecord: (id: number) => void;
};

const initialContext: ContextType = {
  activeRecord: 0,
  hasUpdateButton: false,
  hasDeleteButton: false,
  isConfirmdelete: false,
  close: false,
  crudStatus: { isAdd: false, isDelete: false, isUpdate: false },
  handleHasUpdateButton: (hasUpdateButton) => {},
  handleHasDeleteButton: (hasDeleteButton) => {},
  handleIsConfirmdelete: (isConfirmdelete) => {},
  handleClose: () => {},
  handleCrudStatus: (crudStatus) => {},
  handleActiveRecord: (id) => {},
};

export const TableContext = createContext(initialContext);

type ContextProviderType = {
  children: ReactNode;
};

function ContextProvider({ children }: ContextProviderType) {
  const [activeRecord, setActiveRecord] = useState<number>(0);
  const [hasUpdateButton, setHasUpdateButton] = useState<boolean>(false);
  const [hasDeleteButton, setHasDeleteButton] = useState<boolean>(false);
  const [isConfirmdelete, setIsConfirmdelete] = useState<boolean>(false);
  const [crudStatus, setCrudStatus] = useState<CrudStatus>({
    isAdd: false,
    isUpdate: false,
    isDelete: false,
  });
  const [close, setClose] = useState<boolean>(false);

  const handleHasUpdateButton = (hasUpdateButton: boolean) => {
    setHasUpdateButton((prev) => hasUpdateButton);
  };

  const handleActiveRecord = (id: number) => {
    setActiveRecord((prev) => id);
  };

  const handleHasDeleteButton = (hasDeleteButton: boolean) => {
    setHasDeleteButton((prev) => hasDeleteButton);
  };

  const handleIsConfirmdelete = (isConfirmdelete: boolean) => {
    setIsConfirmdelete((prev) => isConfirmdelete);
  };

  const handleClose = () => {
    setCrudStatus({ isAdd: false, isUpdate: false, isDelete: false });
  };

  const handleCrudStatus = (crudStatus: CrudStatus) => {
    setCrudStatus((prev) => crudStatus);
  };

  const tableContext: ContextType = {
    activeRecord,
    hasUpdateButton,
    hasDeleteButton,
    isConfirmdelete,
    close,
    crudStatus,
    handleHasUpdateButton,
    handleHasDeleteButton,
    handleIsConfirmdelete,
    handleClose,
    handleCrudStatus,
    handleActiveRecord,
  };

  return (
    <TableContext.Provider value={tableContext}>
      {children}
    </TableContext.Provider>
  );
}

export default ContextProvider;
