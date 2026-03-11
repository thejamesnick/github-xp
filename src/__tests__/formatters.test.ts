import { describe, it, expect } from 'vitest';
import { formatJSON, formatMarkdown } from '../utils/formatters.js';
import type { ExportData } from '../types/index.js';

describe('Formatters', () => {
  const mockData: ExportData = {
    username: 'testuser',
    scannedAt: '2026-03-11T10:00:00Z',
    skills: {
      TypeScript: {
        projects: 2,
        totalLines: 15000,
        repos: ['repo1', 'repo2'],
      },
      JavaScript: {
        projects: 1,
        totalLines: 5000,
        repos: ['repo1'],
      },
    },
    projects: [
      {
        name: 'test-project',
        url: 'https://github.com/testuser/test-project',
        description: 'A test project',
        languages: ['TypeScript', 'JavaScript'],
        languageStats: { TypeScript: 10000, JavaScript: 5000 },
        stars: 10,
        forks: 2,
        readme: '# Test Project\n\nThis is a test.',
      },
    ],
  };

  describe('JSON Formatter', () => {
    it('should format data as valid JSON', () => {
      const json = formatJSON(mockData);
      const parsed = JSON.parse(json);

      expect(parsed.username).toBe('testuser');
      expect(parsed.projects).toHaveLength(1);
    });

    it('should include all fields', () => {
      const json = formatJSON(mockData);
      const parsed = JSON.parse(json);

      expect(parsed).toHaveProperty('username');
      expect(parsed).toHaveProperty('scannedAt');
      expect(parsed).toHaveProperty('skills');
      expect(parsed).toHaveProperty('projects');
    });

    it('should preserve README content', () => {
      const json = formatJSON(mockData);
      const parsed = JSON.parse(json);

      expect(parsed.projects[0].readme).toBe('# Test Project\n\nThis is a test.');
    });
  });

  describe('Markdown Formatter', () => {
    it('should format data as markdown', () => {
      const markdown = formatMarkdown(mockData);

      expect(markdown).toContain('# GitHub Experience');
      expect(markdown).toContain('## Skills Summary');
      expect(markdown).toContain('## Projects');
    });

    it('should include project details', () => {
      const markdown = formatMarkdown(mockData);

      expect(markdown).toContain('### test-project');
      expect(markdown).toContain('TypeScript, JavaScript');
      expect(markdown).toContain('https://github.com/testuser/test-project');
    });

    it('should include README content', () => {
      const markdown = formatMarkdown(mockData);

      expect(markdown).toContain('# Test Project');
      expect(markdown).toContain('This is a test.');
    });

    it('should include skills summary', () => {
      const markdown = formatMarkdown(mockData);

      expect(markdown).toContain('TypeScript');
      expect(markdown).toContain('2 projects');
      expect(markdown).toContain('15,000 lines');
    });
  });
});
