import chalk from 'chalk';
import type { ExportData, ProjectExperience, OutputFormat } from '../types/index.js';

export function formatText(data: ExportData): string {
  let output = '\n';
  output += chalk.bold('━ EXPERIENCE EVIDENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n');

  for (const project of data.projects) {
    output += chalk.cyan(`📂 PROJECT: ${project.name}\n`);
    output += chalk.gray(`   ├─ URL: ${project.url}\n`);
    output += chalk.gray(`   ├─ Stack: ${project.languages.join(', ')}\n`);
    if (project.description) {
      output += chalk.gray(`   ├─ Description: ${project.description}\n`);
    }
    if (project.readme) {
      const preview = project.readme.slice(0, 200).replace(/\n/g, ' ');
      output += chalk.gray(`   └─ README: ${preview}...\n`);
    }
    output += '\n';
  }

  output += chalk.bold('━ SUMMARY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n');
  output += chalk.yellow('Matched Skills:\n');
  
  for (const [skill, skillData] of Object.entries(data.skills)) {
    output += chalk.green(`✅ ${skill} - ${skillData.projects} project${skillData.projects > 1 ? 's' : ''}\n`);
  }

  return output;
}

export function formatJSON(data: ExportData): string {
  return JSON.stringify(data, null, 2);
}

export function formatMarkdown(data: ExportData): string {
  let output = '# GitHub Experience\n\n';
  output += `**Scanned:** ${data.scannedAt}\n\n`;
  
  output += '## Skills Summary\n\n';
  for (const [skill, info] of Object.entries(data.skills)) {
    output += `- **${skill}**: ${info.projects} project${info.projects > 1 ? 's' : ''} (${info.totalLines.toLocaleString()} lines)\n`;
  }
  
  output += '\n## Projects\n\n';
  for (const project of data.projects) {
    output += `### ${project.name}\n\n`;
    output += `- **URL:** ${project.url}\n`;
    output += `- **Stack:** ${project.languages.join(', ')}\n`;
    if (project.description) {
      output += `- **Description:** ${project.description}\n`;
    }
    output += `- **Stars:** ${project.stars} | **Forks:** ${project.forks}\n`;
    if (project.readme) {
      output += `\n**README:**\n\n${project.readme}\n`;
    }
    output += '\n---\n\n';
  }
  
  return output;
}

export function format(data: ExportData, format: OutputFormat): string {
  switch (format) {
    case 'json':
      return formatJSON(data);
    case 'markdown':
      return formatMarkdown(data);
    case 'text':
    default:
      return formatText(data);
  }
}
