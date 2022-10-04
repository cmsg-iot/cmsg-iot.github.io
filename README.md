# BEExANT-web-editor

Frontend project designed for BEExANT MCU WEB template.

## Features

- Real-time web edit without compile
- Use [ACE](https://github.com/ajaxorg/ace) code editor to develop
- Support websocket connection
- Support library use
- Export with [pako](https://github.com/nodeca/pako)，compress all static files with `gzip`

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

To create a production build:

```sh
npm run build-prod
```

## Usage

Create a webserver to host all file from `dist` folder.