This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Definitions is a full-stack web application dictionary that's continuously getting written by end users; users can supply the application with words, definitions, and different references. Furthermore, words and definitions can be modified or reported/removed with a voting approuch. Each word and defnition has a validity numeric value (say _V_) that gets increased by one, automatically, after each distinct user reads the definition (users can sign-in with Google). Similary, each word and definition has a invalidity value (say _NV_) that increases by two when users report (vote to remove) the specific word/definition. Any word/definition is deemed valid if and only if _NV_ < _V_/2, considered invalid and removed automatically when _NV_ >= _V_, and regarded in doubt (a warning message appears beside it) otherwise.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
