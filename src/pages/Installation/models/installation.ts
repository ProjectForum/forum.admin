import { IModel, IResult } from '@/types';
import { InstallationService } from '@/services/Installation';
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export interface IInstallationState {
  migration: IInstallationMigrationState;
}

export interface IInstallationMigrationState {
  migrateLog: string;
}

const model: IModel<IInstallationState> = {
  namespace: 'installation',

  state: {
    migration: {
      migrateLog: '',
    },
  },

  effects: {
    *setConfig({ payload }, { call, put }) {
      const response: IResult = yield call(InstallationService.setConfig, payload);
      if (response.code === 1) {
        message.success(response.message);
        yield put(routerRedux.push('/installation/migration'));
      } else {
        message.error(response.message);
      }
    },
    *migrateDatabase({ payload }, { call, put }) {
      const response: IResult<{ output: string }> = yield call(InstallationService.migrateDatabase);
      if (response.code === 1) {
        yield put({
          type: 'setMigrateLog',
          payload: response.payload.output,
        });
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    },
  },

  reducers: {
    setMigrateLog(state: IInstallationState, { payload }) {
      state.migration.migrateLog = payload;
      return state;
    },
  },
};

export default model;
