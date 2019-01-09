'use strict';

const html = require('pa11y-reporter-html');
const pa11y = require('pa11y');
const fs = require('fs');

var urls = [
    'https://www.google.com',
    'https://www.google.com/intl/en/about/',
    'https://www.google.com/intl/en/about/products/',
    'https://www.google.com/intl/en/about/stories/',
    'https://www.google.com/imghp',
    'https://ads.google.com/intl/en_us/home/',
    'https://ads.google.com/intl/en_us/home/faq/',
    //'https://www.google.com/services/',
    //'https://news.google.com/topics/',
    //'https://www.google.com/docs/about/',
    //'https://translate.google.com/community',
    //'https://edu.google.com/intl/en/products/classroom/',
    //'https://edu.google.com/computer-science/'
]

console.log('Performing accessibility audits on ' + urls.length + ' pages. \nPlease wait...')

for (let i = 0; i < urls.length; i++) {
    runTest(urls[i])
}

// Memory leak?
function runTest(url) {
    pa11y(url).then(async results => {
        const auditURL = new URL(url);

        // Returns a string with the results formatted as HTML
        const htmlResults = await html.results(results);
        fs.writeFile('reports/' + auditURL.pathname.replace(/[\/\\:]/g, "\\") + '.html', htmlResults, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('File saved successfully to reports' + auditURL.pathname.replace(/[\/\\:]/g, "\\") + '.html');
        });
    });
}