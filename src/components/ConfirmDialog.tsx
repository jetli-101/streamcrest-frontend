import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { AlertCircle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string | React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  title = "Confirm Action",
  message,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onCancel();
      }}
    >
      <DialogContent className="max-w-sm rounded-xl border border-gray-200 bg-white p-0 shadow-xl">
        <DialogHeader className="px-5 pt-5">
          <div className="flex items-center gap-2">
            <AlertCircle
              className={`h-5 w-5 ${destructive ? "text-red-600" : "text-green-600"}`}
            />
            <DialogTitle className="text-base font-semibold text-gray-900">
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>
        <DialogDescription className="px-5 pb-4 text-sm text-gray-700">
          {message}
        </DialogDescription>
        <div className="flex items-center justify-end gap-3 border-t px-5 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              destructive
                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
            } ${loading ? "opacity-70" : ""}`}
          >
            {loading ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
