"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactSVGElement } from "react";

const SidebarItem = ({
  itemText,
  href,
  icon,
}: {
  itemText: string;
  href: string;
  icon: JSX.Element;
}): JSX.Element => {
  const currentPath = usePathname();

  return (
    <li
      className={`font-bold  ${currentPath === href ? "text-purple-900" : "text-slate-500"} text-lg flex gap-2`}
    >
      <div className="">{icon}</div>
      <Link href={href}>{itemText}</Link>
    </li>
  );
};

export default SidebarItem;
