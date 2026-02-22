import { Card } from "@mantine/core";
import type { FilterType } from "../useUserManagement";

interface StatsCardsProps {
  stats: {
    total: number;
    contributors: number;
    learners: number;
    activeContributors: number;
  };
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function StatsCards({ stats, filter, onFilterChange }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card 
        className={`admin-card cursor-pointer transition-all duration-200 ${
          filter === "all" ? "ring-2 ring-[var(--color-primary)]" : "hover:scale-105"
        }`}
        onClick={() => onFilterChange("all")}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[var(--color-text-muted)] text-sm font-medium">
              Total Users
            </p>
            <p className="text-3xl font-bold text-[var(--color-text)] mt-2">
              {stats.total}
            </p>
          </div>
          <span className="material-symbols-outlined text-4xl text-[var(--color-primary)] opacity-50">
            groups
          </span>
        </div>
      </Card>

      <Card 
        className={`admin-card cursor-pointer transition-all duration-200 ${
          filter === "contributors" ? "ring-2 ring-green-500" : "hover:scale-105"
        }`}
        onClick={() => onFilterChange("contributors")}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[var(--color-text-muted)] text-sm font-medium">
              Contributors
            </p>
            <p className="text-3xl font-bold text-[var(--color-text)] mt-2">
              {stats.contributors}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              {stats.activeContributors} active
            </p>
          </div>
          <span className="material-symbols-outlined text-4xl text-green-500 opacity-50">
            person_check
          </span>
        </div>
      </Card>

      <Card 
        className={`admin-card cursor-pointer transition-all duration-200 ${
          filter === "learners" ? "ring-2 ring-blue-500" : "hover:scale-105"
        }`}
        onClick={() => onFilterChange("learners")}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[var(--color-text-muted)] text-sm font-medium">
              Learners
            </p>
            <p className="text-3xl font-bold text-[var(--color-text)] mt-2">
              {stats.learners}
            </p>
          </div>
          <span className="material-symbols-outlined text-4xl text-blue-500 opacity-50">
            school
          </span>
        </div>
      </Card>
    </div>
  );
}
