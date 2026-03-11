import ora from 'ora';
import chalk from 'chalk';
import { GitHubClient } from '../lib/github-client.js';
import { parseSkills } from '../lib/skill-parser.js';
import { generateProjectExperience } from '../lib/experience-gen.js';
import { format } from '../utils/formatters.js';
import type { OutputFormat, ExportData } from '../types/index.js';

export async function exportCommand(
  username: string,
  options: { token?: string; format?: OutputFormat; limit?: number; includeForks?: boolean }
) {
  const outputFormat = options.format || 'text';
  const limit = options.limit || 10;
  const includeForks = options.includeForks ?? false;
  const spinner = ora(`Generating experience data for ${username}`).start();

  try {
    const client = new GitHubClient(options.token);
    let repos = await client.getRepositories(username);

    // Filter out forks unless explicitly included
    if (!includeForks) {
      repos = repos.filter(repo => !repo.fork);
      spinner.text = `Found ${repos.length} original repos (excluding forks)`;
    }

    spinner.text = 'Analyzing repositories...';

    // Fetch language stats and READMEs for each repo
    const languageStats = new Map();
    const readmes = new Map();
    
    for (const repo of repos) {
      const [owner, repoName] = repo.full_name.split('/');
      if (owner && repoName) {
        const stats = await client.getLanguageStats(owner, repoName);
        languageStats.set(repo.full_name, stats);
        
        // Fetch README for better experience points
        const readme = await client.getReadme(owner, repoName);
        if (readme) {
          readmes.set(repo.full_name, readme);
        }
      }
    }

    // Generate skills inventory
    const skills = parseSkills(repos, languageStats);

    // Generate project experiences
    const projects = repos
      .filter(repo => languageStats.get(repo.full_name) && Object.keys(languageStats.get(repo.full_name)!).length > 0)
      .slice(0, limit)
      .map(repo => generateProjectExperience(
        repo, 
        languageStats.get(repo.full_name)!,
        readmes.get(repo.full_name)
      ));

    const exportData: ExportData = {
      username,
      scannedAt: new Date().toISOString(),
      skills,
      projects,
    };

    spinner.succeed('Experience data generated');

    const output = format(exportData, outputFormat);
    console.log(output);

  } catch (error: any) {
    spinner.fail('Failed to generate experience data');
    console.error(chalk.red(`\nError: ${error.message}`));
    process.exit(1);
  }
}
