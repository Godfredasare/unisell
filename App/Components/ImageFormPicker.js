import { View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";

import ImageInput from "./ImageInput";
import ErrorMessage from "./ErrorMessage";


export default function ImageFormPicker({name}) {
  const { values, setFieldValue } = useFormikContext();

  const handleAdd = (uri) => {
    setFieldValue(name, [...values[name], uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(name, values[name].filter((image) => image !== uri));
  };

  return (
    <View>
      <ImageInput
        imageUris={values[name]}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
       <ErrorMessage name={name} />
      
    </View>
  );
}
