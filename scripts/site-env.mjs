import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const root = fileURLToPath(new URL('../', import.meta.url));

export function parseSiteEnvironment(env) {
  const publisherId = env.ADSENSE_PUBLISHER_ID?.trim();
  const verificationToken = env.GOOGLE_SITE_VERIFICATION?.trim();
  if (!/^pub-\d{16}$/.test(publisherId ?? '')) {
    throw new Error('Set ADSENSE_PUBLISHER_ID in .env or the build environment to pub- followed by 16 digits.');
  }
  if (!/^[A-Za-z0-9_-]{1,256}$/.test(verificationToken ?? '')) {
    throw new Error('Set GOOGLE_SITE_VERIFICATION in .env or the build environment to the Search Console verification token.');
  }

  // Export only the public values needed by the site, never the whole environment.
  return {
    publisherId,
    adsenseAccount: `ca-${publisherId}`,
    verificationToken,
    adsTxt: `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`,
  };
}

export function loadSiteEnvironment(mode = 'production') {
  return parseSiteEnvironment(loadEnv(mode, root, ['ADSENSE_', 'GOOGLE_']));
}
