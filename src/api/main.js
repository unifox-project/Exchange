import http_config from './axios_config';

const HTTP = http_config.instance;

export default {
    PeriodStatistics(from,to) {
        return HTTP.get('/rates/PeriodStatistics/?filters={"in_currency":"'+from+'","out_currency":"'+to+'"}&pagination={"limit":"14"}&sort={"date":"DESC"}');
    },
}