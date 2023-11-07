"use client";

import { getCourseByIdAction, getCourseBySlugAction } from "@/lib/actions/courseActions";
import { PencilSquareIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const getIcon = (path: string) => {
  if (path.startsWith("/courses")) {
    return <PencilSquareIcon className="h-5 w-5" title="Editare informații curs" />;
  } else if (path.startsWith("/admin")) {
    return <EyeIcon className="h-5 w-5" title="Previzualizare interfață student"/>;
  }
}

const getLink = async (path: string) => {
  const segments = path.substring(1).split("/");
  console.log(segments);
  if (path.startsWith("/courses")) {
    if (segments.length > 1) {
      const course = await getCourseBySlugAction(segments[1]);
      if (course) {
        return `/admin/courses/view/${course.id}`;
      }
    }

    return "/admin/courses";
  } else if (path.startsWith("/admin")) {
    if (segments.length > 3 && segments[1] == "courses") {
      const course = await getCourseByIdAction(parseInt(segments[3]));
      if (course) {
        return `/courses/${course.slug}`;
      }
    }
    return "/courses";
  }

  return "";
}

export default function SwitchViewButton() {
  const { data } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const clickHandler = async () => {
    router.push(await getLink(pathName))
  }

  return data?.user?.role == "admin" ? (
    <div className={`p-2 ${pathName.startsWith("/courses") ? "hover:bg-slate-700 hover:text-white text-slate-300" : "hover:bg-teal-200"} rounded-full cursor-pointer`} onClick={clickHandler}>
      {getIcon(pathName)}
    </div>
  ) : null;
}
