import request from '@/utils/request';

export namespace InstallationService {
  export async function setConfig(params) {
    return request('/api/installation/config', {
      method: 'POST',
      data: params,
    });
  }

  export async function migrateDatabase() {
    return request('/api/installation/database', {
      method: 'POST',
    });
  }
}
