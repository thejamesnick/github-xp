import { describe, it, expect } from 'vitest';
import { parseSkills, getTopSkills } from '../lib/skill-parser.js';
import type { Repo } from '../types/index.js';

describe('Skill Parser', () => {
  const mockRepos: Repo[] = [
    {
      name: 'test-repo-1',
      full_name: 'user/test-repo-1',
      description: 'A React application',
      html_url: 'https://github.com/user/test-repo-1',
      language: 'TypeScript',
      stargazers_count: 10,
      forks_count: 2,
      private: false,
      fork: false,
    },
    {
      name: 'test-repo-2',
      full_name: 'user/test-repo-2',
      description: 'A Solana dApp',
      html_url: 'https://github.com/user/test-repo-2',
      language: 'Rust',
      stargazers_count: 5,
      forks_count: 1,
      private: false,
      fork: false,
    },
  ];

  const mockLanguageStats = new Map([
    ['user/test-repo-1', { TypeScript: 5000, JavaScript: 1000 }],
    ['user/test-repo-2', { Rust: 3000, JavaScript: 500 }],
  ]);

  it('should parse skills from repos', () => {
    const skills = parseSkills(mockRepos, mockLanguageStats);

    expect(skills).toHaveProperty('TypeScript');
    expect(skills).toHaveProperty('Rust');
    expect(skills).toHaveProperty('JavaScript');
  });

  it('should count projects correctly', () => {
    const skills = parseSkills(mockRepos, mockLanguageStats);

    expect(skills.TypeScript.projects).toBe(1);
    expect(skills.Rust.projects).toBe(1);
    expect(skills.JavaScript.projects).toBe(2);
  });

  it('should calculate total lines correctly', () => {
    const skills = parseSkills(mockRepos, mockLanguageStats);

    expect(skills.TypeScript.totalLines).toBe(5000);
    expect(skills.Rust.totalLines).toBe(3000);
    expect(skills.JavaScript.totalLines).toBe(1500);
  });

  it('should detect React framework', () => {
    const skills = parseSkills(mockRepos, mockLanguageStats);

    expect(skills).toHaveProperty('React');
    expect(skills.React.projects).toBe(1);
  });

  it('should detect Solana framework', () => {
    const skills = parseSkills(mockRepos, mockLanguageStats);

    expect(skills).toHaveProperty('Solana');
    expect(skills.Solana.projects).toBe(1);
  });

  it('should get top skills', () => {
    const skills = parseSkills(mockRepos, mockLanguageStats);
    const topSkills = getTopSkills(skills, 3);

    expect(topSkills).toBeInstanceOf(Array);
    expect(topSkills.length).toBeLessThanOrEqual(3);
    expect(topSkills).toContain('JavaScript');
  });
});
