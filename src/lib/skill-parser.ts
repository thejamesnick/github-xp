import type { Repo, LanguageStats, SkillInventory } from '../types/index.js';

// Map languages to more resume-friendly skill names
const SKILL_MAPPING: Record<string, string> = {
  'TypeScript': 'TypeScript',
  'JavaScript': 'JavaScript',
  'Python': 'Python',
  'Rust': 'Rust',
  'Go': 'Go',
  'Java': 'Java',
  'Kotlin': 'Kotlin',
  'Swift': 'Swift',
  'Dart': 'Dart',
  'C++': 'C++',
  'C': 'C',
  'Ruby': 'Ruby',
  'PHP': 'PHP',
  'HTML': 'HTML/CSS',
  'CSS': 'HTML/CSS',
  'Solidity': 'Solidity',
  'Shell': 'Shell Scripting',
};

// Detect frameworks from repo names and descriptions
const FRAMEWORK_PATTERNS: Record<string, RegExp> = {
  'React': /react/i,
  'Vue': /vue/i,
  'Angular': /angular/i,
  'Next.js': /next\.?js/i,
  'Svelte': /svelte/i,
  'Node.js': /node\.?js|express/i,
  'Django': /django/i,
  'FastAPI': /fastapi/i,
  'Flask': /flask/i,
  'React Native': /react[- ]native/i,
  'Flutter': /flutter/i,
  'Solana': /solana/i,
  'Ethereum': /ethereum|ethers/i,
  'Web3': /web3/i,
};

export function parseSkills(repos: Repo[], languageStats: Map<string, LanguageStats>): SkillInventory {
  const inventory: SkillInventory = {};

  for (const repo of repos) {
    const repoName = repo.name;
    const stats = languageStats.get(repo.full_name) || {};

    // Add languages
    for (const [lang, lines] of Object.entries(stats)) {
      const skill = SKILL_MAPPING[lang] || lang;
      
      if (!inventory[skill]) {
        inventory[skill] = { projects: 0, totalLines: 0, repos: [] };
      }
      
      inventory[skill].projects++;
      inventory[skill].totalLines += lines;
      if (!inventory[skill].repos.includes(repoName)) {
        inventory[skill].repos.push(repoName);
      }
    }

    // Detect frameworks
    const searchText = `${repo.name} ${repo.description || ''}`;
    for (const [framework, pattern] of Object.entries(FRAMEWORK_PATTERNS)) {
      if (pattern.test(searchText)) {
        if (!inventory[framework]) {
          inventory[framework] = { projects: 0, totalLines: 0, repos: [] };
        }
        inventory[framework].projects++;
        if (!inventory[framework].repos.includes(repoName)) {
          inventory[framework].repos.push(repoName);
        }
      }
    }
  }

  return inventory;
}

export function getTopSkills(inventory: SkillInventory, limit: number = 10): string[] {
  return Object.entries(inventory)
    .sort((a, b) => b[1].projects - a[1].projects)
    .slice(0, limit)
    .map(([skill]) => skill);
}
