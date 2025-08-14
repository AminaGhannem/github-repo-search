# GitHub Repositories Search (React + TypeScript + Vite)

Simple app to search a GitHub user and list their public repositories with client-side filtering by name and programming language.

## Features

- 🔍 Search GitHub users by username
- 📋 Display repositories with key information (stars, forks, language, etc.)
- 🔧 Filter repositories by name and programming language
- 📱 Responsive design with good UX principles
- ♿ Accessible with proper ARIA labels and keyboard support
- 🧪 Comprehensive testing with Vitest and Testing Library
- 📚 Storybook for component development and documentation
- 📖 JSDoc documentation following Google's style guide

## Getting started

```bash
npm install
npm run dev
```

Open the URL printed in the terminal in Google Chrome.

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

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

The app includes a `netlify.toml` configuration file for automatic deployment.

### Other Platforms

The app can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- Surge.sh
- Firebase Hosting

## Code Quality

- **TypeScript**: Full type safety and IntelliSense
- **ESLint**: Code quality and consistency
- **JSDoc**: Comprehensive documentation following Google's style guide
- **Testing**: Unit tests with Vitest and Testing Library
- **Storybook**: Component development and documentation

## Notes

- Uses the GitHub REST API v3 (`/users/:username/repos`) and fetches up to 100 repositories sorted by last update.
- Handles basic error states, rate limit messages from the API, and uses an abort controller to cancel in-flight requests.
- Accessible labels and keyboard support.
- Components are documented with JSDoc and showcased in Storybook.

## Future improvements

- Add pagination for users with more than 100 repositories.
- Add skeleton loaders and error boundary.
- Persist last searched user in URL/query param.
- GraphQL (v4) version using the GitHub GraphQL API.
- Add more comprehensive test coverage.
- Implement dark/light theme switching.
- Add repository sorting options (stars, forks, date).
