import Conf from 'conf';

interface ConfigSchema {
  githubToken?: string;
}

const config = new Conf<ConfigSchema>({
  projectName: 'github-xp',
});

export function setGitHubToken(token: string): void {
  config.set('githubToken', token);
}

export function getGitHubToken(): string | undefined {
  return config.get('githubToken') || process.env.GITHUB_TOKEN;
}

export function clearGitHubToken(): void {
  config.delete('githubToken');
}

export function hasGitHubToken(): boolean {
  return !!getGitHubToken();
}
