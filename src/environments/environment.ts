import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PRODUCTION: boolean;
  CONSENSUS_URL: string;
  WS_CONSENSUS_URL: string;
  SEARCH_URL: string;
}

const envSchema = joi
  .object({
    PRODUCTION: joi.boolean().required(),
    CONSENSUS_URL: joi.string().required(),
    WS_CONSENSUS_URL: joi.string().required(),
    SEARCH_URL: joi.string().required()
  })
  .unknown(true);

const { error, value } = envSchema.validate({
  ...process.env
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const environment = {
  production: envVars.PRODUCTION,
  apiUrl: envVars.CONSENSUS_URL,
  wsUrl: envVars.WS_CONSENSUS_URL,
  apiCentinela: envVars.SEARCH_URL,
};
