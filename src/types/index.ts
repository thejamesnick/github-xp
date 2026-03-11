import { z } from 'zod';

// GitHub API Response Types
export const RepoSchema = z.object({
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  private: z.boolean(),
  fork: z.boolean(),
});

export const LanguageStatsSchema = z.record(z.string(), z.number());

// Internal Types
export interface ProjectExperience {
  name: string;
  url: string;
  description: string | null;
  languages: string[];
  languageStats: Record<string, number>;
  stars: number;
  forks: number;
  readme: string | null;
}

export interface SkillInventory {
  [skill: string]: {
    projects: number;
    totalLines: number;
    repos: string[];
  };
}

export interface ExportData {
  username: string;
  scannedAt: string;
  skills: SkillInventory;
  projects: ProjectExperience[];
}

export type OutputFormat = 'text' | 'json' | 'markdown';

export type Repo = z.infer<typeof RepoSchema>;
export type LanguageStats = z.infer<typeof LanguageStatsSchema>;
