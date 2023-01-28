const google = require('googlethis');

const options = {
  page: 0, 
  safe: false, // Safe Search
  parse_ads: false, // If set to true sponsored results will be parsed,
  use_mobile_ua: false,
  additional_params: { 
    // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
    hl: 'en' 
  }
}

module.exports.parseHTML = async function (html, req) {
  let matches = html.match(/<ami\b[^>]*>[\s\S]*?<\/ami\b[^>]*>/g);
  let promises = [];
  matches?.forEach(async (match) => {
    promises.push(
      Promise.resolve(
        eval(match.replace(/<ami\b[^>]*>/g, "").replace(/<\/ami\b[^>]*>/g, ""))
      ).then((result) => {
        html = html.replaceAll(match, result);
      })
    );
  });

  await Promise.all(promises);
  return html;
};
