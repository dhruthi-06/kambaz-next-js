'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { FaAlignJustify } from 'react-icons/fa';

type Props = {
  course: { name: string } | undefined;
};

export default function Breadcrumb({ course }: Props) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean); 
  // ['Courses', 'RS101', 'Modules']

  const currentSection = pathSegments[2] || 'Home';
  const sectionName = currentSection.charAt(0).toUpperCase() + currentSection.slice(1);

  return (
    <h2 className="text-danger d-flex align-items-center gap-2">
      <FaAlignJustify className="fs-4 mb-1" />
      {course?.name || 'Course'} &gt; {sectionName}
    </h2>
  );
}
