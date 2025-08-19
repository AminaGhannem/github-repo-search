# GitHub Repositories Search (React + TypeScript + Vite)

Simple app to search a GitHub user and list their public repositories with client-side filtering by name and programming language.

## Features

- 🔍 Search GitHub users by username
- 📋 Display repositories with key information (stars, forks, language, etc.)
- 🔧 Filter repositories by name and programming language
- 📱 Responsive design with good UX principles
- 🧪 Comprehensive testing with Vitest and Testing Library
- 📚 Storybook for component development and documentation
- 📖 JSDoc documentation following Google's style guide

## Getting started

```bash
npm install
npm run dev
```

Open the URL printed in the terminal in Google Chrome.

### Auth token (required for GraphQL v4)

This app uses the GitHub GraphQL v4 API. You must provide a GitHub personal access token (classic) with `public_repo` scope:

1. Create a `.env` file in the project root with:
   
   ```bash
   GITHUB_TOKEN=ghp_xxx
   ```

2. Restart the dev server after adding the token.

## Build

```bash
npm run build
npm run preview
```

## Testing

```bash
npm test
```

## Storybook

View and develop components in isolation:

```bash
npm run storybook
```

Build Storybook for production:

```bash
npm run build-storybook
```

## Deployment

### Netlify ✅ (Deployed)

This app is already live on **Netlify**:  
🔗 [https://reposearch-github.netlify.app/](https://reposearch-github.netlify.app/)

Any push to the `master` branch automatically triggers a new build and deployment thanks to the included `netlify.toml` configuration.

**Build settings on Netlify:**
- **Build command:** `npm run build`
- **Publish directory:** `dist`


## Code Quality

- **TypeScript**: Full type safety and IntelliSense
- **ESLint**: Code quality and consistency
- **JSDoc**: Comprehensive documentation following Google's style guide
- **Testing**: Unit tests with Vitest and Testing Library
- **Storybook**: Component development and documentation

## Notes

- Uses the GitHub GraphQL v4 API (/graphql) and fetches up to 100 public repositories sorted by last update.
- Handles basic error states, rate limit messages from the API, and uses an abort controller to cancel in-flight requests.
- Accessible labels and keyboard support.
- Components are documented with JSDoc and showcased in Storybook.

## Future improvements

- Add pagination for users with more than 100 repositories.
- Add skeleton loaders and error boundary.
- Persist last searched user in URL/query param.
- Add more comprehensive test coverage.
- Implement dark/light theme switching.
- Add repository sorting options (stars, forks, date).
