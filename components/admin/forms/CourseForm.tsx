'use client'

import { updateCourseAction, createCourseAction } from "@/lib/actions/courseActions";
import { CourseFormSchema, courseFormSchema } from "@/lib/actions/form_schemas";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Course } from "@prisma/client"
import { Button, Callout, Card } from "@tremor/react";
import { ErrorMessage, Field, FieldProps, Form, Formik, useField, useFormikContext } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React from "react";
import slugify from "slugify";

interface Props {
  course: Course | undefined;
}

const submitHandler = async(values: CourseFormSchema, setStatus: (status?: any) => void, router: AppRouterInstance, course: Course | undefined) => {
  let res = course ?
    await updateCourseAction(course.id, values) :
    await createCourseAction(values);
  
  if (res.error) {
    setStatus(res?.error ?? undefined);
  } else {
    router.push(`/admin/courses/view/${res.courseId}`);
  }
}

interface SlugFieldProps extends React.ComponentPropsWithoutRef<"input"> {
  name: string;
}

const SlugField: React.FC<SlugFieldProps> = (props) => {
  const {
    values: { name, slug },
    touched,
    setFieldValue,
  } = useFormikContext<CourseFormSchema>();
  const [field, meta] = useField(props.name);

  React.useEffect(() => {
    if (name.trim() !== '' && touched.name && slug.trim() === '') {
      setFieldValue(props.name, slugify(name, "_").toLowerCase());
    }
  }, [name, slug, touched.name, setFieldValue, props.name]);

  return <input {...props} {...field} />;
};

export function CourseForm({ course }: Props) {
  const router = useRouter();

  return (
    <Card>
      <Formik
        initialValues={{
          name: course?.name ?? '',
          slug: course?.slug ?? '',
          year: course?.year ?? 1,
          semester: course?.semester ?? 1,
          specialization: course?.specialization ?? 'CTI'
        }}
        validationSchema={courseFormSchema}
        onSubmit={(values, actions) => submitHandler(values, actions.setStatus, router, course)}
      >
        {({ isSubmitting, status, errors, touched }) => (
          <Form>
            {status && (
              <Callout className="mb-4" title="Eroare la adăugare" color="rose" icon={ExclamationTriangleIcon}>
                {status}
              </Callout>
            )}
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Nume curs</label>
              <Field id="name" name="name" className={errors.name && touched.name ? "form-input-error" : "form-input"} placeholder="Nume curs" />
              <ErrorMessage name="name" component="p" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="slug" className="form-label">Identificator curs</label>
              <SlugField id="slug" name="slug" className={errors.slug && touched.slug ? "form-input-error" : "form-input"} placeholder="nume_curs" />
              <ErrorMessage name="slug" component="p" className="mt-1 text-sm text-red-500" />
              <p className="mt-1 text-sm text-gray-500">Variantă prescurtată a numelui de curs care nu conține caractere speciale sau spații și este folosită în URL-ul de curs.</p>
            </div>
            <div className="mb-4">
              <label htmlFor="year" className="form-label">An</label>
              <Field type="number" id="year" name="year" className={errors.year && touched.year ? "form-input-error" : "form-input"} placeholder="An curs" />
              <ErrorMessage name="year" component="p" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="semester" className="form-label">Semestru</label>
              <Field type="number" id="semester" name="semester" className={errors.semester && touched.semester ? "form-input-error" : "form-input"} placeholder="Semestru curs" />
              <ErrorMessage name="semester" component="p" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="specialization" className="form-label">Specializare</label>
              <Field id="specialization" name="specialization" className={errors.specialization && touched.specialization ? "form-input-error" : "form-input"} placeholder="Specializare curs" />
              <ErrorMessage name="specialization" component="p" className="mt-1 text-sm text-red-500" />
            </div>
            <Button type="submit" disabled={isSubmitting} color="teal" size="xs">
              {course ? "Modificare curs" : "Adăugare curs"}
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
