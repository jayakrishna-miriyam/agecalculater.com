import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
export { pageDefinitions, siteUrl } from './content/index';
export { getPageSchema } from './seo/schema';

export const render = (path: string) => renderToString(<App initialPath={path} />);
