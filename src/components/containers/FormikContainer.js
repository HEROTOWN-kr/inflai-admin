import React from 'react';
import { FieldArray, Form, Formik } from 'formik';


function FormikContainer(props) {
  const {
    submitFunc, initValues, schema, children
  } = props;

  return (
    <Formik
      initialValues={initValues}
      enableReinitialize
      validationSchema={schema || {}}
      onSubmit={(values) => {
        submitFunc(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        submitForm
      }) => (
        <Form>{children}</Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
