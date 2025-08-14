# GitHub Repositories Search (React + TypeScript + Vite)

Simple app to search a GitHub user and list their public repositories with client-side filtering by name and programming language.

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

## Notes

- Uses the GitHub REST API v3 (`/users/:username/repos`) and fetches up to 100 repositories sorted by last update.
- Handles basic error states, rate limit messages from the API, and uses an abort controller to cancel in-flight requests.
- Accessible labels and keyboard support.

## Future improvements

- Add pagination for users with more than 100 repositories.
- Add skeleton loaders and error boundary.
- Persist last searched user in URL/query param.
- Storybook for isolated component development.
- GraphQL (v4) version using the GitHub GraphQL API.
