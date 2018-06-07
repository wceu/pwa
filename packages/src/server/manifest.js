const request = require('superagent');
const { normalize, schema } = require('normalizr');

const settingSchema = new schema.Entity(
  'settings',
  {},
  { idAttribute: setting => setting.woronaInfo.namespace },
);
const settingsSchema = [settingSchema];

// Fetch settings from the backend.
const getSettings = async ({ siteId, env }) => {
  const cdn = env === 'prod' ? 'cdn' : 'precdn';
  try {
    const { body } = await request(
      `https://${cdn}.worona.io/api/v1/settings/site/${siteId}/app/prod/live`,
    );
    const { entities: { settings } } = normalize(body, settingsSchema);
    return settings;
  } catch (error) {
    return null;
  }
};

module.exports = async (req, res) => {
  const { siteId } = req.params;

  const settings = (await getSettings({ siteId, env: 'prod' })).theme.manifest;

  // This is the manifest to be sent.
  const manifest = {
    name: settings.name,
    short_name: settings.shortName,
    description: settings.description,
    start_url: settings.startUrl,
    theme_color: settings.themeColor,
    background_color: '#FFF',
    dir: 'auto',
    display: 'standalone',
    orientation: 'portrait',
    lang: 'es',
    icons: [
      {
        src: `${settings.iconSrc}?profile=android-icon-1024`,
        type: 'image/png',
        sizes: '1024x1024',
      },
      {
        src: `${settings.iconSrc}?profile=android-icon-512`,
        type: 'image/png',
        sizes: '512x512',
      },
      {
        src: `${settings.iconSrc}?profile=android-icon-256`,
        type: 'image/png',
        sizes: '256x256',
      },
      {
        src: `${settings.iconSrc}?profile=android-icon-192`,
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: `${settings.iconSrc}?profile=android-icon-152`,
        type: 'image/png',
        sizes: '152x152',
      },
      {
        src: `${settings.iconSrc}?profile=android-icon-144`,
        type: 'image/png',
        sizes: '144x144',
      },
      {
        src: `${settings.iconSrc}?profile=android-icon-128`,
        type: 'image/png',
        sizes: '128x128',
      },
      {
        src: `${settings.iconSrc}?profile=android-icon-96`,
        type: 'image/png',
        sizes: '96x96',
      },
      {
        src: `${settings.iconSrc}?profile=android-icon-72`,
        type: 'image/png',
        sizes: '72x72',
      },
      {
        src: `${settings.iconSrc}?profile=android-icon-48`,
        type: 'image/png',
        sizes: '48x48',
      },
      {
        src: `${settings.iconSrc}?profile=android-icon-36`,
        type: 'image/png',
        sizes: '36x36',
      },
    ],
  };
  res.type('application/manifest+json');
  res.json(manifest);
};
