#CICD Pipeline


phase1.md - a short 2 page (roughly) status on the pipeline in terms of what is currently functional (and what is planned or in progress). Embed your diagram in the markdown file.
phase1.mp4 - a no more than 2 min video demonstration of the pipeline

CI/CD pipeline phase 1 should be a vetting phase where you try and implement as many of the following ideas as possible, based on their relevance to your project:

Linting and code style enforcement (may happen in pipeline and/or in editor)
Code quality via tool  (ex. Codeclimate, Codacy, etc.)
Code quality via human review (ex. Pull Requests)
Unit tests via automation (ex. Jest, Tape, Ava, Cypress, Mocha/Chai, etc.)
Documentation generation via automation (ex. JSDocs)
Other testing including e2e (end to end) and pixel testing is also possible so you may decide to use an environment that does numerous things.

## Introduction
For ShellDiver's Phase 1 CI/CD Pipeline, we have incorporated ESLint for linting and code-style enforcement. Additionally, we have enforced Pull Requests for all branches and issues so that no one can commit to the main branch themselves. We have also added in Jest for unit testing, as we learned in lab 5. Also, we have documentation generation by implementing JSDocs. These are what we have already implemented for phase 1. For phase 2, we plan to incorporate a third-party code quality via tools, such as Codeclimate or Codacy (although we don't like either.). After lab 6, we will incorporate e2e, end-to-end, and pixel testing after lab6. 

## Phase 1 CI/CD Pipeline walkthrough

![image](phase1.drawio.png)

- First, the developr will begin devoloping.
- Next, it will go through ESLINT Static Code analysis
- Then it will check for errors
  - If there are errors, the developer will fix the errors and go back to Step 2
  - Otherwise the developer will create JSDoc COmmments
- After the Developer creates JSDoc Comments, the developer will create JEST Test
- We ask, does it pass the test locally
  - If not, fix the code and go back to step 2
  - If it passes the test locally, then create a new git branch
- After the new git branch, push the changes to remote
- Open a Pull Request
- Go through GitHub actions
- Test code using Jest Unit Test
  - If the code does NOT pass, fix the code, and go back to step 2
  - If the code does, pass go through human review
- A team member will review the code
  - If there are issues, fix the code and go back to step 2
  - If there are no issues, Merge the Pull Request to the Main Branch
- After the merge, go through GitHub actions
- Which renders JSDoc documentation
- Add into Main Branch
- Pipeline Finish
