import { BookOpenIcon, HomeIcon, UsersIcon, AcademicCapIcon } from "@heroicons/react/20/solid";

export interface LinkItem {
  title: string;
  path: string;
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & React.RefAttributes<SVGSVGElement>>;
}

const links: Array<LinkItem> = [
  { title: "Dashboard", path: "/admin/dashboard", icon: HomeIcon},
  { title: "Cursuri", path: "/admin/courses", icon: BookOpenIcon},
  { title: "Liste studenți", path: "/admin/students", icon: AcademicCapIcon},
  { title: "Utilizatori", path: "/admin/users", icon: UsersIcon}
];

export default links;
