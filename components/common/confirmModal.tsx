"use client";

import { Modal, Button, Text, Group } from "@mantine/core";
import { useEffect, useState } from "react";

/**
 * REUSABLE COMPONENT - Confirmation Modal
 * 
 * Purpose: Themed confirmation dialog for destructive/important actions
 * Features:
 * - Light/dark mode compatible
 * - Responsive design
 * - Customizable colors (danger, warning, success)
 * - Loading states
 * - Icon support
 * 
 * Used for: Delete, Promote, Demote, and other confirmations
 */

interface ConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "red" | "orange" | "green" | "yellow";
  loading?: boolean;
  icon?: string; // Material icon name
}

export default function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "orange",
  loading = false,
  icon,
}: ConfirmModalProps) {
  // Store props locally to prevent "undefined" flash during exit animation
  const [displayProps, setDisplayProps] = useState({
    title,
    message,
    confirmText,
    cancelText,
    confirmColor,
    icon,
  });

  useEffect(() => {
    if (opened) {
      // Update display props only when modal is opening
      setDisplayProps({
        title,
        message,
        confirmText: confirmText || "Confirm",
        cancelText: cancelText || "Cancel",
        confirmColor,
        icon,
      });
    }
  }, [opened, title, message, confirmText, cancelText, confirmColor, icon]);
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={true}
      overlayProps={{
        backgroundOpacity: 0.6,
        blur: 4,
      }}
      classNames={{
        content: "bg-[var(--color-surface)] border border-[var(--color-border)]",
        header: "bg-[var(--color-surface)] border-0",
        title: "text-[var(--color-text)]",
        body: "pt-4",
      }}
      styles={{
        content: {
          borderRadius: '12px',
        },
        header: {
          minHeight: '40px',
          padding: '12px 16px',
        },
      }}
    >
      {/* Header with Icon */}
      <div className="mb-6 pt-2">
        {displayProps.icon && (
          <div className="flex justify-center mb-4">
            <div className={`relative flex items-center justify-center w-16 h-16 rounded-full ${
              displayProps.confirmColor === "red" ? "bg-red-500/10" :
              displayProps.confirmColor === "green" ? "bg-green-500/10" :
              displayProps.confirmColor === "yellow" ? "bg-yellow-500/10" :
              "bg-orange-500/10"
            }`}>
              <span 
                className={`material-symbols-outlined ${
                  displayProps.confirmColor === "red" ? "text-red-500" :
                  displayProps.confirmColor === "green" ? "text-green-500" :
                  displayProps.confirmColor === "yellow" ? "text-yellow-500" :
                  "text-orange-500"
                }`}
                style={{ 
                  fontSize: '40px',
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
                }}
              >
                {displayProps.icon}
              </span>
            </div>
          </div>
        )}
        
        <h3 className="text-xl font-bold text-[var(--color-text)] text-center leading-tight">
          {displayProps.title}
        </h3>
      </div>

      {/* Message */}
      <div className="text-sm text-[var(--color-text-secondary)] mb-6 text-center leading-relaxed whitespace-pre-line">
        {displayProps.message}
      </div>

      {/* Action Buttons */}
      <Group justify="center" gap="md" className="mt-6">
        <Button
          variant="subtle"
          color="gray"
          onClick={onClose}
          disabled={loading}
          className="text-[var(--color-text)] hover:bg-[var(--color-background-hover)] min-w-[100px]"
        >
          {displayProps.cancelText}
        </Button>
        <Button
          color={displayProps.confirmColor}
          onClick={onConfirm}
          loading={loading}
          className="min-w-[100px]"
          styles={{
            root: {
              backgroundColor: displayProps.confirmColor === "red" ? "#ef4444" :
                              displayProps.confirmColor === "green" ? "#22c55e" :
                              displayProps.confirmColor === "yellow" ? "#eab308" :
                              "var(--color-primary)",
              '&:hover': {
                backgroundColor: displayProps.confirmColor === "red" ? "#dc2626" :
                                displayProps.confirmColor === "green" ? "#16a34a" :
                                displayProps.confirmColor === "yellow" ? "#ca8a04" :
                                "var(--color-primary-hover)",
              },
            },
          }}
        >
          {displayProps.confirmText}
        </Button>
      </Group>
    </Modal>
  );
}
