# Track generated `.res.mjs` files in version control

ReScript is not a bundler, or even isn't same class transpiler as `tsc` (or any
other) is. JavaScript generated with ReScript is human-readable and following modern and
commonly seen syntax from existing React.js codebases.

As owner and maintainer of repository I have decided to follow habits from
ReScript community despite in JavaScript it was necessary to avoid tracking generated files as they had huge overhead on version controling performance and unrevelant nature of these files. Tracking transpiled files in this allows for quick sanity checking if there were changes that actually had impact on JavaScript output.

This will also make it easier for Non-ReScript vistors to read and understand the changes in Github PRs, and call you out when you are writing inefficient code.

Inspired by: [Why are the generated `.res.mjs` files tracked in git?](https://github.com/rescript-lang/create-rescript-app/tree/a5d8c3773afe72ba9d0ff75b7fe8c45894631df6/templates/rescript-template-nextjs#why-are-the-generated-resmjs-files-tracked-in-git)
