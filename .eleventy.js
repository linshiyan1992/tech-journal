const {DateTime} = require('luxon');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const readerBar = require('eleventy-plugin-reader-bar');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginTOC = require('eleventy-plugin-toc');
const codeblocks = require('@code-blocks/eleventy-plugin');
const math = require('@code-blocks/math');
const prism = require('@code-blocks/prism');


module.exports = function (eleventyConfig) {

    eleventyConfig.addLayoutAlias('index', 'layout/index.njk');
    eleventyConfig.addLayoutAlias('page', 'layout/page.njk');
    eleventyConfig.addLayoutAlias('archive', 'layout/archive.njk');
    eleventyConfig.addLayoutAlias('post', 'layout/post.njk');

    eleventyConfig.addFilter('dateformat', date => {
        const time_ISO = date.toISOString();
        const timeStamp = DateTime.fromISO(time_ISO).toFormat('yyyy-LL-dd HH:mm');
        return timeStamp;
    })

    eleventyConfig.addPassthroughCopy({'src/public':'public'});

    eleventyConfig.addPassthroughCopy({ 'src/public/img/favicon': '/' })

    eleventyConfig.setLibrary(
        'md',
        markdownIt().use(markdownItAnchor)
    );

    eleventyConfig.addPlugin(pluginTOC);

    eleventyConfig.addPlugin(pluginRss);

    // Usage: create div elements:<div class="reader-bar-start">
    // and wrap that div to your content,end with shortcode {% readerBar %}
    eleventyConfig.addPlugin(readerBar);

    //@Code-Blocks
    eleventyConfig.addPlugin(codeblocks([
        math,
        prism,
    ]));

    return {
        dir: {
            input: "src",
            output: "docs"
        },
        pathPrefix: "/tech-journal/"
    }
    // do not code below this line
}

