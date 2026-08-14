export const environment = {
  production: false,
  apiCentinela: "/api-se",
  wsUrl: `${window.location.protocol === 'https:' ? 'wss://' : 'ws://'}${window.location.host}/ws`,
  apiUrl: '/api',
  apiPredictiva: '/api-predictiva',
};
