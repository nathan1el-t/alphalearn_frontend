import { Badge } from "@mantine/core";

export default async function AdminPage() {
  // just a placeholder
  const userRole = "Admin";

  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[var(--color-text)] mb-2">
                Admin Dashboard
              </h1>
              <p className="text-[var(--color-text-secondary)]">
               helloooo
              </p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
