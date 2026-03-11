import chalk from 'chalk';
import type { ExportData, ProjectExperience, OutputFormat } from '../types/index.js';

export function formatText(data: ExportData): string {
  let output = '\n';
  output += chalk.bold('━ EXPERIENCE EVIDENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n');

  for (const project of data.projects) {
    output += chalk.cyan(`📂 PROJECT: ${project.name}\n`);
    output += chalk.gray(`   ├─ Stack: ${project.languages.join(', ')}\n`);
    output += chalk.gray(`   └─ Experience Points:\n`);
    
    for (const point of project.experiencePoints) {
      output += chalk.white(`      • ${point}\n`);
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
    output += `- **Stack:** ${project.languages.join(', ')}\n`;
    output += `- **URL:** ${project.url}\n`;
    if (project.description) {
      output += `- **Description:** ${project.description}\n`;
    }
    output += `- **Experience:**\n`;
    for (const point of project.experiencePoints) {
      output += `  - ${point}\n`;
    }
    output += '\n';
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
