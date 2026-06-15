import React, { useEffect } from 'react';
import { siteUrl } from '../siteContent';

interface SeoManagerProps {
    title: string;
    description: string;
    path: string;
    robots?: string;
    type?: 'website' | 'article';
    schema?: Record<string, unknown>;
}

const upsertMeta = (selector: string, create: () => HTMLMetaElement, content: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(selector);
    if (!element) {
        element = create();
        document.head.appendChild(element);
    }
    element.content = content;
};

export const SeoManager: React.FC<SeoManagerProps> = ({
    title,
    description,
    path,
    robots = 'index, follow',
    type = 'website',
    schema,
}) => {
    useEffect(() => {
        const canonicalUrl = `${siteUrl}${path === '/' ? '/' : path}`;
        document.title = title;

        upsertMeta('meta[name="description"]', () => {
            const meta = document.createElement('meta');
            meta.name = 'description';
            return meta;
        }, description);

        upsertMeta('meta[name="robots"]', () => {
            const meta = document.createElement('meta');
            meta.name = 'robots';
            return meta;
        }, robots);

        upsertMeta('meta[property="og:title"]', () => {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:title');
            return meta;
        }, title);

        upsertMeta('meta[property="og:description"]', () => {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:description');
            return meta;
        }, description);

        upsertMeta('meta[property="og:url"]', () => {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:url');
            return meta;
        }, canonicalUrl);

        upsertMeta('meta[property="og:type"]', () => {
            const meta = document.createElement('meta');
            meta.setAttribute('property', 'og:type');
            return meta;
        }, type);

        upsertMeta('meta[name="twitter:title"]', () => {
            const meta = document.createElement('meta');
            meta.name = 'twitter:title';
            return meta;
        }, title);

        upsertMeta('meta[name="twitter:description"]', () => {
            const meta = document.createElement('meta');
            meta.name = 'twitter:description';
            return meta;
        }, description);

        upsertMeta('meta[name="twitter:url"]', () => {
            const meta = document.createElement('meta');
            meta.name = 'twitter:url';
            return meta;
        }, canonicalUrl);

        let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = canonicalUrl;

        let schemaTag = document.head.querySelector<HTMLScriptElement>(
            'script[data-seo-schema="true"], script[data-static-seo-schema="true"]'
        );
        if (!schemaTag) {
            schemaTag = document.createElement('script');
            schemaTag.type = 'application/ld+json';
            document.head.appendChild(schemaTag);
        }
        delete schemaTag.dataset.staticSeoSchema;
        schemaTag.dataset.seoSchema = 'true';
        schemaTag.textContent = schema ? JSON.stringify(schema) : '';
    }, [description, path, robots, schema, title, type]);

    return null;
};
