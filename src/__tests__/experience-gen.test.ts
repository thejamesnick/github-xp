import { describe, it, expect } from 'vitest';
import { generateProjectExperience } from '../lib/experience-gen.js';
import type { Repo } from '../types/index.js';

describe('Experience Generator', () => {
  const mockRepo: Repo = {
    name: 'awesome-project',
    full_name: 'user/awesome-project',
    description: 'A cool web application',
    html_url: 'https://github.com/user/awesome-project',
    language: 'TypeScript',
    stargazers_count: 42,
    forks_count: 5,
    private: false,
    fork: false,
  };

  const mockLanguageStats = {
    TypeScript: 10000,
    JavaScript: 2000,
  };

  it('should generate project experience', () => {
    const experience = generateProjectExperience(mockRepo, mockLanguageStats);

    expect(experience.name).toBe('awesome-project');
    expect(experience.url).toBe('https://github.com/user/awesome-project');
    expect(experience.description).toBe('A cool web application');
    expect(experience.stars).toBe(42);
    expect(experience.forks).toBe(5);
  });

  it('should include languages', () => {
    const experience = generateProjectExperience(mockRepo, mockLanguageStats);

    expect(experience.languages).toContain('TypeScript');
    expect(experience.languages).toContain('JavaScript');
  });

  it('should include language stats', () => {
    const experience = generateProjectExperience(mockRepo, mockLanguageStats);

    expect(experience.languageStats).toEqual(mockLanguageStats);
  });

  it('should handle null README', () => {
    const experience = generateProjectExperience(mockRepo, mockLanguageStats, null);

    expect(experience.readme).toBeNull();
  });

  it('should include README when provided', () => {
    const readme = '# Awesome Project\n\nThis is a cool project.';
    const experience = generateProjectExperience(mockRepo, mockLanguageStats, readme);

    expect(experience.readme).toBe(readme);
  });
});
