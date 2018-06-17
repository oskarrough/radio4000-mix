Forked from https://github.com/internet4000/radio4000-mix. Rewritten to try out different techniques

One goal is not needing a build a system. Start a web server in this folder to try. 

```
npm i -g serve
serve .
```

If the above doesn't work, or if your browser does not support [loading JavaScript modules using `<script type="module">`](https://caniuse.com/#feat=es6-module), you'll have to bundle the scripts:

```
yarn start
yarn build
```

## Browser support

- Chrome + Safari
- Firefox with "module scripts" enabled (Tip: go to `about:config` to find and enable it)
- Edge doesn't work

## Credits

- https://github.com/internet4000/radio4000-player/
- https://github.com/internet4000/radio4000-js-sdk/
- https://github.com/polymer/lit-html/
- https://parceljs.org/
- https://www.jsdelivr.com/

