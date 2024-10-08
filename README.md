This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Definitions is a full-stack web application dictionary that's continuously getting written by end users; users can supply the application with words, definitions, and different references. Furthermore, words and definitions can be modified or reported/removed with a voting approuch. Each word and defnition has a validity numeric value (say _V_) that gets increased by one, automatically, after each distinct user reads the definition (users can sign-in with Google). Similary, each word and definition has a invalidity value (say _NV_) that increases by two when users report (vote to remove) the specific word/definition. Any word/definition is deemed valid if and only if _NV_ < _V_/2, considered invalid and removed automatically when _NV_ >= _V_, and regarded in doubt (a warning message appears beside it) otherwise.

> Try it out: [https://definitions.up.railway.app/](https://definitions.up.railway.app/)

## Getting Started

You can run it in your machine with the following commands:

```bash
npm install
npm run build
npm run start
```

> You may wanna use the `npx auth secret` command first and add google api keys in `.env.local` file, in order to be able to function all features. [learn more](https://authjs.dev/getting-started/installation?framework=next.js)
