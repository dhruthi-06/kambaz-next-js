"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function BreadCrumb({ 
  course 
}: { 
  course: { name: string; _id?: string } | undefined; 
}) {
  const pathname = usePathname();
  const currentSection = pathname.split("/").pop();  
  const formatSectionName = (section: string | undefined) => {
    if (!section) return "";
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <>
      {course?.name || "Course"} &gt; {formatSectionName(currentSection)}
    </>
  );
}