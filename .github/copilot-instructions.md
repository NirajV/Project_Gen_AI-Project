# AI Copilot Instructions for Project_Gen_AI-Project

## Project Overview
A generative AI project with multi-environment branching strategy. Currently in early stage with repository structure established but limited implementation.

## Git Workflow & Branch Strategy
- **Development**: Primary integration branch for feature work
- **QA-UAT**: Quality assurance and user acceptance testing environment
- **Production/Prod**: Production-ready releases
- **main**: Legacy/backup main branch

When creating PRs or making changes, target the **Development** branch as the primary integration point.

## Current Project State
- README.md exists but contains minimal documentation
- No source code, tests, or CI/CD pipelines currently committed
- Environment setup and technology stack not yet documented

## Before Contributing
1. **Document the tech stack**: When adding code, update README.md with:
   - Primary language(s) and frameworks
   - Key dependencies and versions
   - Build/run commands
   
2. **Establish project structure** as files are added:
   - Create clear separation for source, tests, configs
   - Reference this guide when deciding on project layout

3. **Git conventions**:
   - Use conventional commit messages: `feat:`, `fix:`, `docs:`, `test:`
   - Include branch prefix when creating feature branches: `feature/`, `bugfix/`, `docs/`
   - Keep commits atomic and well-described

## Key Files to Create/Maintain
- `README.md` - Project overview, setup instructions, running/building guide
- `.gitignore` - Language/framework-specific ignores
- `.github/workflows/` - CI/CD pipelines when implemented
- Source code directories - Define structure clearly when adding implementation

## Next Steps for AI Agents
1. Focus on understanding the project's actual scope (check with project owner)
2. Add meaningful documentation as files are created
3. Establish CI/CD workflows for the QA-UAT and Production branches
4. Create development environment setup instructions

---
**Generated**: January 2026  
**Status**: Initial template - awaiting project implementation details
