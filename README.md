# Foxglove Studio

Foxglove Studio ([foxglove.dev](https://foxglove.dev)) is an integrated visualization and diagnosis tool for robotics.

## Installation

Visit [foxglove.dev/download](https://foxglove.dev/download) or [GitHub Releases](https://github.com/foxglove/studio/releases) to download the latest version.

## Support

- [GitHub Discussions](https://github.com/foxglove/studio/discussions)
- [Slack Community](https://foxglove.dev/join-slack)
- [@foxglovedev on Twitter](https://twitter.com/foxglovedev)

## Contributing

Contributions are welcome! Foxglove Studio is primarily written in TypeScript, the instructions below should help you get started:

**Supported development environments:** Linux, Windows, macOS

**Required dependencies:**

- [Node.js](https://nodejs.org/en/) v14+
- [Yarn](https://yarnpkg.com/getting-started/install) (`npm install -g yarn`)
- [Git LFS](https://git-lfs.github.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

**Getting started:**

1. Clone git repo
1. Run `yarn install`
1. Launch the development environment (run both scripts concurrently):

```sh
$ yarn serve        # start webpack
$ yarn start        # launch electron
```

**Other useful commands:**

```sh
$ yarn run          # list available commands
$ yarn lint         # lint all files
$ yarn test         # run all tests
$ yarn test:watch   # run tests on changed files
```
