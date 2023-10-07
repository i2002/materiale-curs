'use client'

import { createStudentListAction, updateStudentListAction } from "@/app/_lib/forms/actions";
import { studentListFormSchema } from "@/app/_lib/forms/form_schemas";
import { StudentListWithStudents } from "@/app/_lib/studentListController";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button, Callout, Card, Title } from "@tremor/react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

interface Props {
  list: StudentListWithStudents | undefined;
}

const submitHandler = async (values: {[key: string]: string}, setStatus: (status?: any) => void, router: AppRouterInstance, list: StudentListWithStudents | undefined) => {
  let res = list ? 
    await updateStudentListAction(list.id, values) :
    await createStudentListAction(values);

  if (res) {
    setStatus(res?.error ?? undefined);
  } else {
    router.push("/admin/students/");
  }
}

export function StudentListForm({ list }: Props) {
  const router = useRouter();

  return (
    <Card>
      <Formik
        initialValues={{
          listName: list?.name ?? '',
          emails: list?.students.map(stud => stud.email).join(";") ?? ''
        }}
        validationSchema={studentListFormSchema}
        onSubmit={(values, actions) => submitHandler(values, actions.setStatus, router, list)}
      >
        {({ isSubmitting, status, errors, touched }) => (
          <Form>
            {status && (
              <Callout className="mb-4" title="Eroare la adăugare" icon={ExclamationTriangleIcon} color="rose">
                {status}
              </Callout>
            )}
            <div className="mb-4">
              <label htmlFor="listName" className="form-label">Nume listă</label>
              <Field id="listName" name="listName" className={errors.listName && touched.listName ? "form-input-error" : "form-input"} placeholder="Nume listă" />
              <ErrorMessage name="listName" component="p" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="emails" className="form-label">Adrese email studenți</label>
              <Field as="textarea" id="emails" name="emails" className={errors.emails && touched.emails ? "form-input-error" : "form-textarea"} placeholder="Adrese email separate prin ;" />
              <ErrorMessage name="emails" component="p" className="mt-1 text-sm text-red-500" />
            </div>
            <Button type="submit" disabled={isSubmitting} color="teal" size="xs">
              {list ? "Modificare listă" : "Adăugare listă"}
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
