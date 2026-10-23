export const environment = {
  production: false,
  apiIdentity: '/api/identity',
  apiSocial: '/api/social',
  apiSearch: '/api/search',
  apiPredictive: '/api/predictive',
  // ethical-recommender-service (FastAPI). Local dev: proxy.conf.json rewrites
  // /api/recommender/* -> http://localhost:8000/*; staging needs a gateway-service route.
  apiRecommender: '/api/recommender',
  wsUrl: `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${window.location.host}/ws`,
};
