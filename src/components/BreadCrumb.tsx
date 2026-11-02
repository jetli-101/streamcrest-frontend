"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Breadcrumb: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<
    { href: string; label: string }[]
  >([]);

  useEffect(() => {
    if (!pathname) return;

    const pathParts = pathname.split("/").filter(Boolean);

    const crumbs = pathParts.map((part, index) => {
      const href = "/" + pathParts.slice(0, index + 1).join("/");
      let label = part
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      if (label.startsWith("[") && label.endsWith("]")) {
        label = label.slice(1, -1);
      }

      return { href, label };
    });

    setBreadcrumbs(crumbs);
  }, [pathname]);

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  if (!breadcrumbs.length) return null;

  return (
    <nav aria-label="Breadcrumb">
      <ol className="my-2 flex font-semibold text-gray-500">
        <li className="flex items-center justify-center">
          <a
            onClick={() => handleRedirect("/dashboard")}
            className="flex cursor-pointer items-center justify-center hover:text-gray-500"
            aria-current={pathname === "/dashboard" ? "page" : undefined}
          >
            <span className="ml-1">Home</span>
          </a>
        </li>

        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            <span className="mx-1 text-gray-400">/</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="text-black" aria-current="page">
                {breadcrumb.label}
              </span>
            ) : (
              <a
                onClick={() => handleRedirect(breadcrumb.href)}
                className="cursor-pointer text-black hover:text-black/70"
              >
                {breadcrumb.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
