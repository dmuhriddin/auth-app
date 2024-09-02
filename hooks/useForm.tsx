import { UserInfo } from "@/types";
import React, { FormEvent, useState } from "react";

function useForm(initialValue: UserInfo) {
  const [values, setValues] = useState(initialValue);

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setValues({ ...values, [name]: value });
  };

  const reset = () => {
    setValues(initialValue);
  };

  return { values, handleChange, reset };
}

export default useForm;
