import { replaceMappedChars } from '../util';


/**
 * Strip text between '<' and '>' from string.
 */
export const removeTags = str => {
  let res = '';
  let intag = false;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const ch = str[i];
    switch (ch) {
    case '<':
      intag = true;
      break;
    case '>':
      intag = false;
      break;
    default:
      if (!intag) {
        res += ch;
      }
    }
  }
  return res;
};

const HTML_ATTRIBUTE_CHARS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};

export const escapeHtmlAttributes = str => {
  return replaceMappedChars(str, HTML_ATTRIBUTE_CHARS);
};

const SLUG_KILLCHARS = /[^a-zA-Z0-9\s-]+/g;
const WHITESPACE_RE = /\s+/g;

export const slugify = str => {
  str = str.replace(SLUG_KILLCHARS, '');
  str = str.replace(WHITESPACE_RE, '-');
  return str.toLowerCase();
};


const SCRIPT_TAG = /<\//g;

export const escapeScriptTags = str => {
  return str.replace(SCRIPT_TAG, '<\\\/');
};

const ELLIPSIS = '...';

export const truncate = (str, maxLen) => {
  if (str.length <= maxLen) {
    return str;
  }

  let end = maxLen;
  for (let i = maxLen - 1; i >= 0; i--) {
    const ch = str[i];
    if (ch === ' ' || ch === '\n' || ch === '\t' || ch === '\u000b' || ch === '\r' || ch === '\f') {
      end = i + 1;
      break;
    }
  }
  return str.substring(0, end) + ELLIPSIS;
};
