import request from '@/utils/request';

export namespace InstallationService {
  export async function setConfig(params: any) {
    return request('/api/installation/config', {
      method: 'POST',
      data: params,
    });
  }

  export async function initDatabase() {
    return request('/api/installation/database', {
      method: 'POST',
    });
  }

  export async function setSetting(params: any) {
    return request('/api/installation/setting', {
      method: 'POST',
      data: params,
    });
  }
}
