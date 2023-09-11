type Customer = {
  id: number;
  guid: string;
  customer: string;
  asset_type: string;
  serial_number: string;
  service_contract: boolean;
  warranty: boolean;
};

type CustomerVisibleCols = {
  id: number;
  customer: string;
  asset_type: string;
  serial_number: string;
  service_contract: boolean;
  warranty: boolean;
};

type CalculatedField = {
  fieldIndex: string;
  calcFunc: (fieldVal: boolean) => JSX.Element;
};

type colLabel = {
  colName: string;
  label: string;
  isSorted: boolean;
  sortable: boolean;
  widthcss: string;
};

type CustomerMetadata = {
  id: string;
  private: boolean;
  createdAt: string;
};

type CustomersData = {
  record: Customer[];
  metadata: CustomerMetadata;
};
