import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSiteEnvironment } from '../../scripts/site-env.mjs';

const valid = { ADSENSE_PUBLISHER_ID: 'pub-1234567890123456', GOOGLE_SITE_VERIFICATION: 'test_verification-token' };

test('publisher configuration keeps ads.txt and verification metadata consistent', () => {
  const site = parseSiteEnvironment({ ...valid, PRIVATE_API_KEY: 'do-not-publish' });
  assert.equal(site.adsenseAccount, 'ca-pub-1234567890123456');
  assert.equal(site.adsTxt, 'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n');
  assert.equal(site.verificationToken, valid.GOOGLE_SITE_VERIFICATION);
  assert.ok(!JSON.stringify(site).includes('do-not-publish'));
});

test('missing or malformed Google identifiers stop the build', () => {
  for (const publisher of [undefined, '', 'ca-pub-1234567890123456', 'pub-123', 'pub-1234567890123456\nextra']) {
    assert.throws(() => parseSiteEnvironment({ ...valid, ADSENSE_PUBLISHER_ID: publisher }), /ADSENSE_PUBLISHER_ID/);
  }
  for (const token of [undefined, '', '<meta content="token">', 'token with spaces']) {
    assert.throws(() => parseSiteEnvironment({ ...valid, GOOGLE_SITE_VERIFICATION: token }), /GOOGLE_SITE_VERIFICATION/);
  }
});
