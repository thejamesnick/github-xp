# GitHub XP - CLI Tool
## Experience Extractor for Resume Building

---

## 1. Project Overview

**GitHub XP** is a CLI tool that analyzes a developer's GitHub repositories to extract real-world project experience and output structured data (JSON/Markdown) that AI or resume builders can use to generate resumes.

**Problem:** Listing languages/frameworks on a resume doesn't prove experience. Recruiters want to see *what you've built* and the *impact* you made.

**Solution:** Scan GitHub repos → match against job requirements → export structured experience data that AI can transform into resume content.

---

## 2. How It Works

```
$ gh-xp --github thejamesnick --job "React TypeScript Solana Developer"
```

**Output:**
```
━ EXPERIENCE EVIDENCE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 PROJECT: Burner Wallet
   ├─ Stack: React JS, JavaScript, Solana Web3 JS, Crypto.JS
   └─ Resume Points:
      • Built a Solana web wallet & browser extension using React & JavaScript
      • Implemented secure transaction signing with Crypto.JS & TweetNacl.js
      • Integrated Solana blockchain using Solana Web3 JS library

📂 PROJECT: SIKGuard Wallet  
   ├─ Stack: Rust, Solana, Blockchain
   └─ Resume Points:
      • Lead development of production Solana wallet (Rust backend)
      • Implemented cryptographic security standards for crypto transactions

📂 PROJECT: Ordi Lads NFT
   ├─ Stack: NFT, SVG, TypeScript
   └─ Resume Points:
      • Developed NFT generator app for high-volume NFT collections
      • Created SVG-based dynamic NFT traits for premium collections

━ SUMMARY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Matched Skills:
✅ React - 3 projects
✅ JavaScript - 5 projects  
✅ TypeScript - 2 projects
✅ Solana - 2 projects
✅ Rust - 1 project
✅ Node.js - 2 projects
```

---

## 3. Core Features

### 3.1 Repo Scanner
- Fetch all public repos (no auth needed)
- Fetch private repos (with GitHub Personal Access Token)
- Parse repository metadata:
  - Languages used (% per language)
  - Stars, forks, description
  - README content
  - recent commits

### 3.2 Skill Extractor
- Map file extensions to skill categories
- Group repos by technology stack
- Calculate experience depth (how much code in each language)

### 3.3 Experience Data Generator
- Analyze repo purpose & functionality
- Generate action-verb bullet points as structured data
- Include specific technologies used
- Highlight impact metrics (if available from commits/descriptions)
- Output in AI-consumable formats (JSON/Markdown)

### 3.4 Job Matcher
- Take job description as input
- Extract required skills from text
- Score repos against requirements
- Prioritize matching projects

---

## 4. Technical Architecture

```
┌─────────────────────────────────────────────────────┐
│                     CLI Interface                    │
├─────────────────────────────────────────────────────┤
│  Commands:                                          │
│  - scan <github-username>                           │
│  - match <github-username> --job "<job-description>"│
│  - export <github-username> --format json/markdown │
├─────────────────────────────────────────────────────┤
│                   GitHub API Client                  │
│  - Public repos (no auth)                           │
│  - Private repos (with PAT)                         │
│  - Rate limiting handling                           │
├─────────────────────────────────────────────────────┤
│                   Skills Engine                      │
│  - Language mapping (ext → skill)                   │
│  - Framework detection                             │
│  - Category grouping                                │
├─────────────────────────────────────────────────────┤
│              Experience Data Formatter               │
│  - Template system                                 │
│  - Action verb library                              │
│  - Export formats (text/json/markdown)              │
└─────────────────────────────────────────────────────┘
```

---

## 5. Command Line Interface

### Installation
```bash
npm install -g github-xp
# or
cargo install github-xp
```

### Commands

| Command | Description |
|---------|-------------|
| `gh-xp scan <username>` | List all repos with skills found |
| `gh-xp match <username> --job "<job desc>"` | Generate resume points |
| `gh-xp skills <username>` | Show aggregated skills inventory |
| `gh-xp config set-token <PAT>` | Save GitHub token for private repos |
| `gh-xp export <username> --format json` | Export full profile |

### Flags

| Flag | Description |
|------|-------------|
| `--job, -j` | Job description to match against |
| `--token, -t` | GitHub PAT for private repos |
| `--format, -f` | Output format: text, json, markdown |
| `--limit, -l` | Number of projects to analyze (default: all) |

---

## 6. Supported Languages & Frameworks

Initial mapping (expandable):

| Category | Technologies |
|----------|---------------|
| **Frontend** | React, Vue, Angular, Svelte, Next.js, Nuxt |
| **Mobile** | React Native, Flutter, Swift, Kotlin |
| **Backend** | Node.js, Express, Django, FastAPI, Go, Rust |
| **Blockchain** | Solidity, Rust (Solana), ethers.js, web3.js |
| **Database** | PostgreSQL, MongoDB, Redis, Prisma |
| **DevOps** | Docker, Kubernetes, AWS, GCP |
| **Languages** | JavaScript, TypeScript, Python, Go, Rust, Dart, Swift, Java |

---

## 7. Output Formats

### Text (Default)
```
📂 PROJECT NAME
   Stack: React, TypeScript, Node.js
   • Built [description from analysis]
   • Implemented [feature based on commits]
```

### JSON
```json
{
  "username": "thejamesnick",
  "skills": ["React", "Rust", "Solana"],
  "projects": [
    {
      "name": "Burner Wallet",
      "languages": ["TypeScript", "Rust"],
      "resume_points": [
        "Built a Solana web wallet using React & TypeScript"
      ]
    }
  ]
}
```

### Markdown
```markdown
## Projects

### Burner Wallet
- **Stack:** React, TypeScript, Solana
- **Points:**
  - Built production Solana wallet for web & browser
```

---

## 8. GitHub API Rate Limits

| Type | Limit |
|------|-------|
| Unauthenticated | 60 requests/hour |
| Authenticated | 5,000 requests/hour |

Tool should:
- Cache results locally
- Warn when approaching limit
- Support `.env` or config for token

---

## 9. Future Enhancements (Phase 2+)

- [ ] Commit message analysis for impact verbs
- [ ] CI/CD pipeline detection
- [ ] README → project description extractor
- [ ] Auto-generate cover letter sections
- [ ] Compare against multiple jobs at once
- [ ] Integration with resume-builder skill

---

## 10. File Structure (if Node.js)

```
github-xp/
├── src/
│   ├── index.ts          # CLI entry point
│   ├── github-client.ts  # GitHub API calls
│   ├── skill-parser.ts   # Language detection
│   ├── experience-gen.ts # Experience data generator
│   └── job-matcher.ts    # Job description parser
├── package.json
├── README.md
└── .env.example
```

---

## 11. Example Usage Flow

```bash
# First time - set up token (for private repos)
gh-xp config set-token ghp_xxxxxxxxxxxx

# See full skills breakdown
gh-xp skills thejamesnick

# Match against a job
gh-xp match thejamesnick --job "Looking for React Native developer with TypeScript experience for mobile crypto wallet"

# Export to JSON for resume builder integration
gh-xp export thejamesnick --format json > profile.json
```

---

## 12. Success Metrics

- Returns relevant projects within 3 seconds
- Generates at least 2 resume bullets per matched project
- Supports 20+ common languages/frameworks
- Works without auth for public repos

---

**Created for:** Nicholas James (thejamesnick)  
**Purpose:** Extract GitHub experience data in AI-consumable formats (JSON/MD) for resume builders