import type { Repo, LanguageStats, ProjectExperience } from '../types/index.js';

const ACTION_VERBS = [
  'Built', 'Developed', 'Implemented', 'Created', 'Designed',
  'Architected', 'Engineered', 'Deployed', 'Integrated', 'Optimized'
];

const PROJECT_TYPES: Record<string, string[]> = {
  'wallet': ['crypto wallet', 'blockchain wallet', 'digital wallet'],
  'nft': ['NFT collection', 'NFT marketplace', 'NFT generator'],
  'dapp': ['decentralized application', 'dApp', 'blockchain application'],
  'api': ['REST API', 'API service', 'backend API'],
  'bot': ['automation bot', 'Discord bot', 'Telegram bot'],
  'cli': ['command-line tool', 'CLI utility', 'terminal application'],
  'web': ['web application', 'web platform', 'web service'],
  'mobile': ['mobile application', 'mobile app', 'cross-platform app'],
};

function detectProjectType(repo: Repo): string {
  const searchText = `${repo.name} ${repo.description || ''}`.toLowerCase();
  
  for (const [key, descriptions] of Object.entries(PROJECT_TYPES)) {
    if (searchText.includes(key)) {
      return descriptions[0];
    }
  }
  
  return 'application';
}

function getRandomVerb(): string {
  return ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
}

export function generateExperiencePoints(
  repo: Repo,
  languageStats: LanguageStats
): string[] {
  const points: string[] = [];
  const languages = Object.keys(languageStats);
  const primaryLang = languages[0];
  const projectType = detectProjectType(repo);
  
  // Main project description
  if (languages.length > 0) {
    const langList = languages.slice(0, 3).join(', ');
    points.push(
      `${getRandomVerb()} ${projectType} using ${langList}`
    );
  }

  // Technology-specific points
  if (repo.description) {
    points.push(
      `${getRandomVerb()} ${repo.description.toLowerCase()}`
    );
  }

  // Add framework/library specific points
  const desc = `${repo.name} ${repo.description || ''}`.toLowerCase();
  
  if (desc.includes('solana') || desc.includes('web3')) {
    points.push('Integrated blockchain functionality with Web3 libraries');
  }
  
  if (desc.includes('react')) {
    points.push('Built responsive UI components with React');
  }
  
  if (desc.includes('typescript')) {
    points.push('Implemented type-safe code architecture with TypeScript');
  }

  // Engagement metrics
  if (repo.stargazers_count > 10) {
    points.push(`Open source project with ${repo.stargazers_count}+ GitHub stars`);
  }

  return points.slice(0, 3); // Limit to 3 points per project
}

export function generateProjectExperience(
  repo: Repo,
  languageStats: LanguageStats
): ProjectExperience {
  return {
    name: repo.name,
    url: repo.html_url,
    description: repo.description,
    languages: Object.keys(languageStats),
    languageStats,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    experiencePoints: generateExperiencePoints(repo, languageStats),
  };
}
