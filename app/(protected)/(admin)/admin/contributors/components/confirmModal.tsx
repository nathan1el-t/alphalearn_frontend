"use client";

import { Modal, Button, Text } from "@mantine/core";

interface ConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  loading?: boolean;
}

export function ConfirmModal({
  opened,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "orange",
  loading = false,
}: ConfirmModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={600} size="lg">{title}</Text>}
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Text size="sm" className="text-[var(--color-text-secondary)] mb-10">
        {message}
      </Text>

      <div className="flex gap-3 justify-end">
        <Button
          variant="subtle"
          color="gray"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </Button>
        <Button
          color={confirmColor}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
