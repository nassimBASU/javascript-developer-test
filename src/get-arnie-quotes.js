const { httpGet } = require('./mock-http-interface');

/**
 * Fetches Arnie quotes from multiple URLs in parallel and returns
 * either "Arnie Quote" or "FAILURE" based on HTTP status.
 *
 * @param {GetArnieQuotesInput} urls
 * @returns {ArnieQuoteResponse}
 */
const getArnieQuotes = async (urls) => {
  return Promise.all(
    urls.map(async (url) => {
      const response = await httpGet(url);
      const body = JSON.parse(response.body);

      if (response.status === 200) {
        return { 'Arnie Quote': body.message };
      }

      return { FAILURE: body.message };
    })
  );
};

module.exports = {
  getArnieQuotes,
};
