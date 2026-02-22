import { Badge, Card, Text, Button } from "@mantine/core";
import type { AdminUser } from "@/interfaces/interfaces";
import type { FilterType } from "../useUserManagement";

interface UsersTableViewProps {
  filteredUsers: AdminUser[];
  filter: FilterType;
  loading: string | null;
  onPromote: (userId: string, username: string) => void;
  onDemote: (userId: string, username: string) => void;
}

export function UsersTableView({ 
  filteredUsers, 
  filter, 
  loading, 
  onPromote, 
  onDemote 
}: UsersTableViewProps) {
  const getFilterLabel = () => {
    if (filter === "all") return "All Users";
    if (filter === "contributors") return "Contributors";
    return "Learners";
  };

  const getEmptyMessage = () => {
    if (filter === "all") return "No users found";
    if (filter === "contributors") return "No contributors found";
    return "No learners found";
  };

  return (
    <Card className="admin-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[var(--color-text)]">
          {getFilterLabel()} ({filteredUsers.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="admin-table w-full">
          <thead>
            <tr>
              <th className="text-[var(--color-text)] font-semibold text-left p-3">Username</th>
              <th className="text-[var(--color-text)] font-semibold text-left p-3">User ID</th>
              <th className="text-[var(--color-text)] font-semibold text-left p-3">Role</th>
              <th className="text-[var(--color-text)] font-semibold text-left p-3">Status</th>
              <th className="text-[var(--color-text)] font-semibold text-left p-3">Promoted At</th>
              <th className="text-[var(--color-text)] font-semibold text-left p-3">Demoted At</th>
              <th className="text-[var(--color-text)] font-semibold text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8">
                  <Text c="dimmed">{getEmptyMessage()}</Text>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const isActive = user.role === "CONTRIBUTOR" && user.demotedAt === null;
                const isDemoted = user.role === "CONTRIBUTOR" && user.demotedAt !== null;
                
                return (
                  <tr 
                    key={user.userId} 
                    className="hover:bg-[var(--color-background-hover)] border-b border-[var(--color-border)]"
                  >
                    <td className="p-3">
                      <Text fw={500} className="text-[var(--color-text)]">
                        {user.username}
                      </Text>
                    </td>
                    <td className="p-3">
                      <Text size="sm" className="text-[var(--color-text-secondary)] font-mono">
                        {user.userId}
                      </Text>
                    </td>
                    <td className="p-3">
                      <Badge 
                        variant="light" 
                        className={
                          user.role === "CONTRIBUTOR" 
                            ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" 
                            : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {user.role === "CONTRIBUTOR" ? (
                        <Badge 
                          variant="light" 
                          className={isActive ? "admin-badge-success" : "admin-badge-error"}
                        >
                          {isActive ? "ACTIVE" : "DEMOTED"}
                        </Badge>
                      ) : (
                        <Text size="sm" className="text-[var(--color-text-secondary)]">—</Text>
                      )}
                    </td>
                    <td className="p-3">
                      <Text size="sm" className="text-[var(--color-text-secondary)]">
                        {user.promotedAt 
                          ? new Date(user.promotedAt).toLocaleDateString() 
                          : "—"}
                      </Text>
                    </td>
                    <td className="p-3">
                      <Text size="sm" className="text-[var(--color-text-secondary)]">
                        {user.demotedAt 
                          ? new Date(user.demotedAt).toLocaleDateString() 
                          : "—"}
                      </Text>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        {user.role === "LEARNER" ? (
                          <Button
                            variant="light"
                            color="green"
                            size="xs"
                            className="admin-action-view"
                            onClick={() => onPromote(user.userId, user.username)}
                            loading={loading === user.userId}
                          >
                            <span className="material-symbols-outlined text-sm mr-1">
                              person_add
                            </span>
                            Promote
                          </Button>
                        ) : isActive ? (
                          <Button
                            variant="light"
                            color="red"
                            size="xs"
                            className="admin-action-delete"
                            onClick={() => onDemote(user.userId, user.username)}
                            loading={loading === user.userId}
                          >
                            <span className="material-symbols-outlined text-sm mr-1">
                              person_remove
                            </span>
                            Demote
                          </Button>
                        ) : (
                          <Button
                            variant="light"
                            color="green"
                            size="xs"
                            className="admin-action-view"
                            onClick={() => onPromote(user.userId, user.username)}
                            loading={loading === user.userId}
                          >
                            <span className="material-symbols-outlined text-sm mr-1">
                              person_add
                            </span>
                            Re-promote
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
