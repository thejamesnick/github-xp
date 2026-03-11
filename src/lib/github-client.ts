import { Octokit } from '@octokit/rest';
import { getGitHubToken } from '../utils/config.js';
import type { Repo, LanguageStats } from '../types/index.js';
import { RepoSchema, LanguageStatsSchema } from '../types/index.js';

export class GitHubClient {
  private octokit: Octokit;

  constructor(token?: string) {
    const authToken = token || getGitHubToken();
    this.octokit = new Octokit({
      auth: authToken,
    });
  }

  async getRepositories(username: string): Promise<Repo[]> {
    try {
      const { data } = await this.octokit.repos.listForUser({
        username,
        per_page: 100,
        sort: 'updated',
      });

      return data.map(repo => RepoSchema.parse(repo));
    } catch (error: any) {
      if (error.status === 404) {
        throw new Error(`User '${username}' not found on GitHub`);
      }
      throw new Error(`Failed to fetch repositories: ${error.message}`);
    }
  }

  async getLanguageStats(owner: string, repo: string): Promise<LanguageStats> {
    try {
      const { data } = await this.octokit.repos.listLanguages({
        owner,
        repo,
      });

      return LanguageStatsSchema.parse(data);
    } catch (error: any) {
      console.warn(`Could not fetch languages for ${owner}/${repo}`);
      return {};
    }
  }

  async getRateLimit(): Promise<{ remaining: number; limit: number }> {
    const { data } = await this.octokit.rateLimit.get();
    return {
      remaining: data.rate.remaining,
      limit: data.rate.limit,
    };
  }
}
