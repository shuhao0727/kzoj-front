"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/16/solid";
import classNames from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import { Alert } from "./alert";

export const Paginate: React.FC<{
  pageName?: string;
  pageSize?: number;
  className?: string;
  totalKey: string;
  totalFetcher: () => Promise<number>;
}> = ({ pageName, pageSize, className, totalKey, totalFetcher }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const __pageName = useMemo(() => pageName ?? "page", [pageName]);
  const __pageSize = useMemo(() => pageSize ?? 20, [pageSize]);

  const { data: total, error } = useSWR(totalKey, totalFetcher);
  const totalPages = useMemo(
    () => (!total ? 0 : Math.ceil(total / __pageSize)),
    [total, __pageSize]
  );
  const currentPage = useMemo(
    () =>
      searchParams.has(__pageName)
        ? Number.parseInt(searchParams.get(__pageName) ?? "1")
        : 1,
    [__pageName, searchParams]
  );

  const onPageChange = useCallback(
    (event: { selected: number }) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(__pageName, String(event.selected + 1));
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <div className={className}>
      {!!error && (
        <Alert type="error" title="获取分页失败">
          {error}
        </Alert>
      )}
      {!!currentPage && !!totalPages && (
        <ReactPaginate
          activeLinkClassName="!text-blue-700 font-bold underline"
          breakLabel={<EllipsisHorizontalIcon className="w-4 h-4" />}
          breakLinkClassName={classNames(
            "w-12 h-8 inline-flex justify-center items-center rounded-md",
            "hover:bg-gray-100 hover:text-gray-900"
          )}
          containerClassName="h-8 m-2 flex items-center"
          disableInitialCallback
          initialPage={currentPage - 1}
          nextLabel={<ChevronRightIcon className="w-4 h-4" />}
          nextLinkClassName={classNames(
            "w-12 h-8 inline-flex justify-center items-center rounded-md",
            currentPage < totalPages
              ? "hover:bg-gray-100 hover:text-gray-900"
              : "text-gray-400"
          )}
          onPageChange={onPageChange}
          pageRangeDisplayed={1}
          pageCount={totalPages}
          pageLinkClassName={classNames(
            "w-12 h-8 leading-8 inline-block text-center rounded-md",
            "hover:bg-gray-100 hover:underline"
          )}
          previousLabel={<ChevronLeftIcon className="w-4 h-4" />}
          previousLinkClassName={classNames(
            "w-12 h-8 inline-flex justify-center items-center rounded-md",
            currentPage > 1
              ? "hover:bg-gray-100 hover:text-gray-900"
              : "text-gray-400"
          )}
        />
      )}
    </div>
  );
};
