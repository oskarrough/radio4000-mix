Forked from https://github.com/internet4000/radio4000-mix. Rewritten to try out different techniques.

This project does not require a build system. Start any web server in this folder to try.

```
yarn global add serve
serve .
open index.html
```

If your browser does not support [`loading JavaScript modules using <script type="module">`](https://caniuse.com/#feat=es6-module), you'll have to bundle the scripts. Do that with `yarn start` for development and `yarn build` for production. It will build into the `dist` folder.

Uses these open source projects:

- https://parceljs.org/
- https://github.com/internet4000/radio4000-player/
- https://github.com/internet4000/radio4000-js-sdk/
- https://github.com/polymer/lit-html/
- https://www.jsdelivr.com/
