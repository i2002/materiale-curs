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


/**
 * Schema for the create and edit course forms
 */
export const courseFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Prea puține caractere")
    .max(255, "Prea multe caractere")
    .required("Câmp obligatoriu"),
  slug: Yup.string()
    .trim()
    .matches(/^[\w-]+$/gm, "Sunt permise doar literele a-z, cifre și _")
    .lowercase()
    .required("Câmp obligatoriu"),
  year: Yup.number()
    .min(1, "Anul trebuie să fie cuprins între 1 și 4")
    .max(4, "Anul trebuie să fie cuprins între 1 și 4")
    .required("Câmp obligatoiru"),
  semester: Yup.number()
    .min(1, "Semestrul poate fi 1 sau 2")
    .max(2, "Semestrul poate fi 1 sau 2")
    .required("Câmp obligatoriu"),
  specialization: Yup.string()
    .trim()
    .max(10, "Prea multe caractere")
    .required("Câmp obligatoriu")
});

export interface CourseFormSchema extends Yup.InferType<typeof courseFormSchema> {}
