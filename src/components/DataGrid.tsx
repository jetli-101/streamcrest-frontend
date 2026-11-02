"use client";

import { Loader2, Search, Printer, RefreshCw, Download, FileText, Code, MoreHorizontal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import DefaultButton from "./Buttons/DefaultButton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";

interface ColumnItem {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface ActionItem {
  label: string | ((row: any) => string);
  icon?: React.ReactNode | ((row: any) => React.ReactNode);
  onClick?: (row: any) => void;
  isVisible?: (row: any) => boolean;
}

interface DataGridProps {
  columns?: ColumnItem[];
  data?: Record<string, any>[];
  actions?: ActionItem[] | ((row: any) => ActionItem[]);
  rowsPerPage?: number;
  btnLabel?: string;
  showButtons?: boolean;
  btnDisabled?: boolean;
  btnOnClick?: () => void;
  btnType?: "button" | "submit" | "reset";
  showExportButton?: boolean;
  showImportButton?: boolean;
  exportDisabled?: boolean;
  importDisabled?: boolean;
  importFunction?: () => void;
  btnIcon?: React.ReactNode;
  showFilterButton?: boolean;
  loading?: boolean;
  heading?: string;
  onRefresh?: () => void;
}

const DataGrid: React.FC<DataGridProps> = (props) => {
  const {
    columns = [],
    data = [],
    actions = [],
    rowsPerPage = 10,
    btnLabel = "",
    showButtons = false,
    btnDisabled = false,
    btnOnClick = () => {},
    showExportButton = false,
    showImportButton = false,
    exportDisabled = false,
    importDisabled = false,
    importFunction = () => {},
    btnType = "button",
    btnIcon,
    showFilterButton = false,
    loading = false,
    heading = "",
    onRefresh,
  } = props;

  const [searchQry, setSearchQry] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isExporting, setIsExporting] = useState(false);

  const hasActionsColumn =
    typeof actions === "function" ||
    (Array.isArray(actions) && actions.length > 0);

  const searchThroughData = (row: any, searchTerm: string): boolean => {
    if (!searchTerm) return true;

    return columns.some((column) => {
      const value = column.render ? column.render(row) : row[column.key];
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const filteredData = Array.isArray(data)
    ? data.filter((row) => searchThroughData(row, searchQry))
    : [];

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const onPageChange = (page: number) => setCurrentPage(page);

  const truncateWords = (text: string, wordLimit = 4): string => {
    if (!text) return "";
    const words = text.toString().split(/\s+/);
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const exportToCSV = () => {
    const exportColumns = columns.filter((col) => col.key !== "actions");
    const csvHeaders = exportColumns.map((col) => col.label);
    const csvContent = [
      csvHeaders.join(","),
      ...filteredData.map((row) =>
        exportColumns
          .map((col) => `"${String(row[col.key] ?? "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${heading || "export"}_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const exportColumns = columns.filter((col) => col.key !== "actions");
    const exportData = filteredData.map((row) => {
      const obj: Record<string, any> = {};
      exportColumns.forEach((col) => {
        obj[col.label] = row[col.key] ?? "";
      });
      return obj;
    });
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${heading || "export"}_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = async (format: "csv" | "json") => {
    if (filteredData.length === 0) return;
    setIsExporting(true);
    try {
      if (format === "csv") exportToCSV();
      else exportToJSON();
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQry]);

  return (
    <div className="p-2">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{heading}</h2>
          <span className="self-end rounded-full bg-slate-100 px-2.5 py-1 text-base text-slate-600 hover:bg-slate-300">
            {filteredData.length}
          </span>
          <div className="relative w-[300px]">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded border border-gray-300 py-2 pl-10 pr-4 text-sm shadow-sm transition-all focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQry}
              onChange={(e) => setSearchQry(e.target.value)}
            />
          </div>
        </div>

        {showButtons && (
          <div className="flex items-center justify-end gap-2">
            {onRefresh && (
              <Button
                onClick={onRefresh}
                className="mr-2 flex items-center gap-2"
                variant="outline"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            )}
            <DefaultButton
              text="Print"
              icon={<Printer className="h-4 w-4" />}
              onClick={() => window.print()}
              className="mr-2"
            />
            {showFilterButton && (
              <DefaultButton text="Filter" onClick={() => {}} />
            )}
            {showExportButton && (
              <div className="group relative">
                <DefaultButton
                  text={isExporting ? "Exporting..." : "Export"}
                  onClick={() => handleExport("csv")}
                  disabled={exportDisabled || isExporting}
                  icon={
                    isExporting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )
                  }
                />
                <div className="absolute right-0 z-10 hidden w-48 rounded-md bg-white py-1 shadow-lg group-hover:block">
                  <button
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleExport("csv")}
                    disabled={isExporting}
                  >
                    <FileText className="h-4 w-4 text-gray-500" />
                    Export as CSV
                  </button>
                  <button
                    className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handleExport("json")}
                    disabled={isExporting}
                  >
                    <Code className="h-4 w-4 text-yellow-500" />
                    Export as JSON
                  </button>
                </div>
              </div>
            )}
            {showImportButton && (
              <DefaultButton
                text="Import"
                onClick={importFunction}
                disabled={importDisabled}
              />
            )}
            {btnLabel && (
              <DefaultButton
                text={btnLabel}
                icon={btnIcon}
                type={btnType}
                disabled={btnDisabled}
                onClick={btnOnClick}
              />
            )}
          </div>
        )}
      </div>

      <div className="w-full rounded-lg border bg-white">
        <div className="overflow-x-auto">
          {loading && (
            <div className="flex h-[600px] flex-col items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-green-500" />
                <p className="text-lg text-gray-600">Loading data...</p>
              </div>
            </div>
          )}

          {!loading && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {hasActionsColumn && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                    >
                      Actions
                    </th>
                  )}
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-900"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => {
                    const rowActions =
                      typeof actions === "function" ? actions(row) : actions;
                    const safeActions = Array.isArray(rowActions)
                      ? rowActions
                      : [];
                    const filteredActions = safeActions
                      .filter(
                        (a) => !a.isVisible || a.isVisible(row)
                      )
                      .map((a) => ({
                        ...a,
                        label:
                          typeof a.label === "function" ? a.label(row) : a.label,
                        icon:
                          typeof a.icon === "function" ? a.icon(row) : a.icon,
                      }));

                    return (
                      <tr key={index} className="rounded-2xl hover:bg-gray-50">
                        {filteredActions.length > 0 && (
                          <td className="text-center">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 hover:bg-gray-100"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="text-green-700" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-white"
                              >
                                <DropdownMenuLabel className="font-bold">
                                  Actions
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="mx-2 bg-green-600" />
                                {filteredActions.map((action, i) => (
                                  <DropdownMenuItem
                                    key={i}
                                    onClick={() => action.onClick?.(row)}
                                    className="cursor-pointer bg-white hover:bg-gray-100"
                                  >
                                    {action.icon && (
                                      <span className="mr-2">{action.icon}</span>
                                    )}
                                    {action.label as string}
                                  </DropdownMenuItem>
                                ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        )}

                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                          >
                            {column.render
                              ? column.render(row)
                              : truncateWords(row[column.key])}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + (hasActionsColumn ? 1 : 0)}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {filteredData.length > rowsPerPage && (
        <Pagination className="my-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={`${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                }`}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1);
              const showEllipsisBefore =
                page === currentPage - 2 && currentPage > 3;
              const showEllipsisAfter =
                page === currentPage + 2 && currentPage < totalPages - 2;

              if (showEllipsisBefore || showEllipsisAfter) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis className="text-gray-500" />
                  </PaginationItem>
                );
              }

              if (showPage) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => onPageChange(page)}
                      isActive={currentPage === page}
                      className={`cursor-pointer ${
                        currentPage === page
                          ? "border-green-600 bg-green-600 text-white hover:bg-green-700"
                          : "border-green-600 text-green-600 hover:border-green-700 hover:bg-green-50"
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }

              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
                className={`${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default DataGrid;
