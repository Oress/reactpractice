

// {propName: validatorFn}
// return {formValue, formErrors, isValid}
// errors = {propName: [error]}

import { useEffect, useState } from "react";

export default function useFormGroup(formConfig) {
    const [formValue, setFormValue] = useState({});
    const [didEdit, setDidEdit] = useState({});

    useEffect(() => {
        const entries = Object.keys(formConfig).map((key) => [key, '']);
        const editEntries = Object.keys(formConfig).map((key) => [key, false]);
        setFormValue(Object.fromEntries(entries));
        setDidEdit(Object.fromEntries(editEntries));
    }, [formConfig]);

    function updateFormValue(key, value) {
        setDidEdit((prevValue) => {
            return {
                ...prevValue,
                [key]: true
            };
        });
        setFormValue((prevValue) => {
            return {
                ...prevValue,
                [key]: value
            };
        });
    }

    const formErrors = {};

    Object.entries(formConfig).forEach(([key, validators]) => {
        if(!didEdit[key]) return;

        const errors = validators.map((validator) => validator(formValue[key])).filter((error) => error !== null);
        if (errors.length > 0) {
            formErrors[key] = errors;
        }
    });

    return {formValue, updateFormValue, formErrors};
}