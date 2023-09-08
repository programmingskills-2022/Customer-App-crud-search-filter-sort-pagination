"use client";

import Card from "@/components/ui/Card";
import Form from "@/components/ui/Form";
import { useState } from "react";

export default function CustomerAddForm() {
  const [formFields, setFormFields] = useState<Fields>({
    id: 1,
    serial_number: "",
    asset_type: "",
    customer: "",
    service_contract: false,
    warranty: false,
  });
  return (
    <Card classname="flex w-full md:w-1/2 bg-slate-400 p-4 md:mx-auto md:p-8 mt-4 rounded-xl">
      <Form fields={formFields} setFields={setFormFields} buttonLabel="Add" />
    </Card>
  );
}
