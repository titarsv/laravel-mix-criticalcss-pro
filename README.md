# Laravel Mix Critical

This extension provides instant Critical support to your Mix (v2.1 and up) builds.

## Usage

First, install the extension.

```
npm install laravel-mix-criticalcss-pro --save-dev
```

Then, require it within your `webpack.mix.js` file, like so:

```js
let mix = require('laravel-mix');

require('laravel-mix-criticalcss-pro');

mix
    .js('resources/assets/js/app.js', 'public/js')
    .less('resources/assets/less/app.less', 'public/css')
    .criticalCssPro({
        enabled: mix.inProduction(),
        paths: {
            base: 'https://url-of-where-criticalcss-is-extracted.com/',
            templates: './where-critical-css-file-needs-to-be-written/',
            suffix: '_critical.min'
        },
        urls: [
            { url: 'blog', template: 'blog', excludedSources: ['css/home.css'] },
        ],
        options: {
            minify: true,
        },
    });

// generates `./where-critical-css-file-needs-to-be-written/blog_critical.min.css`
```

And you're done! Compile everything down with `npm run prod`. `npm run dev` will not generate any critical css! Also make sure that your paths are correct and point to valid urls / segments of your website, whenever criticalcss has issues detecting the url, it might throw a console error!

## Options
Only `urls` is required - all other options are optional. If you don't want to use the paths object you can simply define your base and templates in the url and template options from `urls`

| Name             | Type               | Default              | Description   |
| ---------------- | ------------------ | -------------------- |-------------  |
| enabled          | `boolean`          | `mix.inProduction()` | If generating Critical CSS should be enabled |
| paths            | `object`           | `{}`                 | Takes 3 arguments `base` ( src-url ), `templates` ( folder where critical css files should be written ) and `suffix` ( filename pattern )
| urls             | `array`            | `[]`                 | An array of url objects, each with a url, template key and excludedSources: `{ url: 'http://example.com', template: 'index', excludedSources: ['css/blog.css'] }` |
| options          | `object`           | `{}`                 | An object of [Critical](https://github.com/addyosmani/critical#options) options |
