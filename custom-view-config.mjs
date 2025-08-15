/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomView}
 */
const config = {
  name: 'My New Custom View Project',
  cloudIdentifier: 'gcp-eu',
  env: {
    development: {
      initialProjectKey: 'io-white-label-development',
    },
    production: {
      customViewId: 'cmecvm5kh000oxc018ppe6wtm',
      url: 'https://order-details-custom-view-project.vercel.app/',
    },
  },
  oAuthScopes: {
    view: ['view_orders'],
    manage: ['manage_orders'],
  },
  type: 'CustomPanel',
  typeSettings: {
    size: 'LARGE',
  },
  locators: ['orders.order_details.general'],
};

export default config;
