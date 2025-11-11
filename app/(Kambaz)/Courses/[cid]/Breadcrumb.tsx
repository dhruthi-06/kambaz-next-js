'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { FaAlignJustify } from 'react-icons/fa';

type Props = {
  course: { name: string } | undefined;
  onToggle: () => void; // ✅ add this line
};

export default function Breadcrumb({ course, onToggle }: Props) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const currentSection = pathSegments[2] || 'Home';
  const sectionName =
    currentSection.charAt(0).toUpperCase() + currentSection.slice(1);

  return (
    <h2 className="text-danger d-flex align-items-center gap-2">
      {/* ✅ Sandwich icon toggles sidebar */}
      <FaAlignJustify
        className="fs-4 mb-1"
        role="button"
        onClick={onToggle}
        title="Toggle Navigation"
      />
      {course?.name || 'Course'} &gt; {sectionName}
    </h2>
  );
}
