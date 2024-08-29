const mix = require('laravel-mix');

class CriticalPro {
    dependencies() {
        this.requiresReload = `
            HTML Webpack critical has been installed. Please run "npm run dev" again.
        `;

        return ['html-critical-webpack-plugin-pro'];
    }

    register(config) {
        if (!config.urls || config.urls.length <= 0) {
            throw new Error(
                'You need to provide at least 1 valid url object containing both url and template keys.'
            );
        }

        this.config = Object.assign({
            enabled: mix.inProduction(),
            paths: {},
            urls: [],
            options: {},
        }, config);

        if (this.config.paths.suffix == null) this.config.paths.suffix = '_critical.min';
    }

    webpackPlugins() {
        if (this.config.enabled) {
            const HtmlCriticalPro = require('html-critical-webpack-plugin-pro');
            const plugins = [];

            this.config.urls.forEach((template) => {

                const criticalSrc = this.config.paths.base + template.url;
                const criticalDest = this.config.paths.templates + template.template + this.config.paths.suffix + '.css';

                if (criticalSrc.indexOf('amp_') !== -1) {

                    this.config.options.width = 600;
                    this.config.options.height = 19200;

                }

                plugins.push(new HtmlCriticalPro(Object.assign({
                    src: criticalSrc,
                    dest: criticalDest,
                    excludedSources: typeof(template.excludedSources) !== 'undefined' ? template.excludedSources : [],
                }, this.config.options)));

            });

            return plugins;

        }

    }

}

mix.extend('criticalCssPro', new CriticalPro());