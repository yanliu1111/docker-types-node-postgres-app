# Nodejs app with Docker/typescript/postgres/Prisma

## Getting Started

ts.config in beginning using pnpm

` npm install -g pnpm`

`pnpm init`

`pnpm add typescript`

`pnpm add --save-dev @tsconfig/node18`

`pnpm add --save-dev @types/node` for node API

`SWC` for complie js with ts

`pnpm add --save-dev @swc/cli @swc/core rimraf`

## Learnings Notes

1. `rimraf` is utility package, help you do what on in Unix world would be RM RF to just completely wipe out directory and nice thing about using this is it works cross-plateform. If you’ve got windows folks working on this project too, and you want to delete a directory then this will work in the windows world as well.

2. `"scourceMaps": "inline"` when compiling from ts to js it’s going to set up some Source Maps actually embedded inside file, it helps us when we get to working on debugging. We want to be able to debug our code using our Rich debugger tools that we have in vs code because it’s going to be running in Docker there’s a little bit hoisting setup to get that to work in the `SourceMap inline.`it is very configuration in order to make that work and make that happen and allow us to debug something in vs code, and actually

3. In package.json, "start:docker": "pnpm build && node --inspect=0.0.0.0 dist/index.js", it is just going to enable debugging
   In `launch.json` file, `"request": "attach"` and `"port": 9229` is going to attach to the debugger that’s running in the container.

4. A nice thing to have in Docker compose land. Every service name then becomes to DNS name, so you are inside the docker evn trying to connect to one service to another, you can just connect to the DNS name `backend` or the DNS name `postgres`.

```yml
services:
   backend:
      build: .
      ports:
      ...
      environment:
      DATABASE_URL: postgres://postgres@postgres:5432/webapp_dev
      PORT: 5000
```

5. Prisma
   `pnpm add --save-dev prisma`
   ` pnpm add @prisma/client`
   `pnpx prisma init` -- it will use the Prisma CLI and initialize the files we need to set up Prisma in our env here.
   `slug String @unique` - if you have blog post you might want fancy URL, so we set string as unique. It is expecting that we have a unique index in the DB.
   About naming, make my model name `Post` singular and make my database name plural `posts`
   Done the model create, `pnpx prisma generate`, this is going to generate a specific client for your specific project for your specific models.
   Note: if we change models inside, we have to rebuild docker image, so we can get new client. Another option is you could add this to the build script and build every time you start the docker server.
