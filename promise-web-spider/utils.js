import path from 'path'
import { URL } from 'url'
import slug from 'slug'
import * as cheerio from 'cheerio';

export function urlToFilename (url) {
  const parsedUrl = new URL(url)
  const urlPath = parsedUrl.pathname.split('/')
    .filter(function (component) {
      return component !== ''
    })
    .map(function (component) {
      return slug(component, { remove: null })
    })
    .join('/')
  let filename = path.join(parsedUrl.hostname, urlPath)
  if (!path.extname(filename).match(/htm/)) {
    filename += '.html'
  }

  return filename
}

/**
 * Extracts and normalizes a link URL from a given element relative to the current URL.
 * 
 * @param {string} currentUrl - The URL of the current page.
 * @param {Object} element - The DOM element containing the link. Got from cheerio selector.
 * @returns {string|null} The normalized link URL if it belongs to the same hostname and has a valid pathname, otherwise null.
 */
function getLinkUrl (currentUrl, element) {
  const parsedLink = new URL(element.attribs.href || '', currentUrl)
  const currentParsedUrl = new URL(currentUrl)
  if (parsedLink.hostname !== currentParsedUrl.hostname ||
    !parsedLink.pathname) {
    return null
  }
  return parsedLink.toString()
};

/**
 * Extracts all the links on current page with the same hostname as the current URL.
 * 
 * @param {string} currentUrl - The URL of the current page.
 * @param {string} body - The raw HTML document of the current page.
 * @returns {Array<string>} All the links on current page that have the same hostname and has a valid pathname.
 */
export function getPageLinks (currentUrl, body) {
  return Array.from(cheerio.load(body)('a'))
    .map(function (element) {
      return getLinkUrl(currentUrl, element)
    })
    .filter(Boolean)
};