import type { Repo, LanguageStats, ProjectExperience } from '../types/index.js';

export function generateProjectExperience(
  repo: Repo,
  languageStats: LanguageStats,
  readme?: string | null
): ProjectExperience {
  return {
    name: repo.name,
    url: repo.html_url,
    description: repo.description,
    languages: Object.keys(languageStats),
    languageStats,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    readme: readme || null,
  };
}
