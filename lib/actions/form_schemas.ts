import * as Yup from 'yup';

/**
 * Schema for the create and edit student list forms
 */
const email = "[\\w.-]+@s\\.unibuc\\.ro";
export const studentListFormSchema = Yup.object().shape({
  listName: Yup.string()
    .trim()
    .min(2, 'Prea puține caractere')
    .max(50, 'Prea multe caractere')
    .required('Câmp obligatoriu'),
  emails: Yup.string()
    .trim()
    .matches(new RegExp(`^(${email}(;${email})*)?$`, "gm"), 'Adrese s.unibuc.ro separate prin ;')
});

export interface StudentListFormSchema extends Yup.InferType<typeof studentListFormSchema> {}
