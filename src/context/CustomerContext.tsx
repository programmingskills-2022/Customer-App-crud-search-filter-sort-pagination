import { ReactNode, createContext, useState } from "react";

type TCustomerContext = {
  pageTitle: string;
  handlePageTitle: (pageTitle: string) => void;
};

const CustomerContext = createContext<TCustomerContext>({} as TCustomerContext);

type CustomerProviderProps = {
  children: ReactNode;
};

function CustomerProvider({ children }: CustomerProviderProps) {
  const [pageTitle, setPageTitle] = useState<string>("SimuData App");

  const handlePageTitle = (pageTitle: string) => {
    setPageTitle((prev) => pageTitle);
  };

  const values: TCustomerContext = {
    pageTitle,
    handlePageTitle,
  };

  return (
    <CustomerContext.Provider value={values}>
      {children}
    </CustomerContext.Provider>
  );
}

export { CustomerContext };
export default CustomerProvider;
