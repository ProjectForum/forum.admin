import { IModel, IResult } from '@/types';
import { InstallationService } from '@/services/Installation';
import { routerRedux } from 'dva/router';
import { ResponseError } from 'umi-request';
import { message } from 'antd';
import { ResultCodes } from '@/utils/resultCode';

export interface IInstallationState {
  migration: IInstallationMigrationState;
}

export interface IInstallationMigrationState {
  migrateLog: string;
  queryFailed: boolean;
  queryFailedMessage: string;
}

const model: IModel<IInstallationState> = {
  namespace: 'installation',

  state: {
    migration: {
      migrateLog: '',
      queryFailed: false,
      queryFailedMessage: '',
    },
  },

  effects: {
    *setConfig({ payload }, { call, put }) {
      const response: IResult = yield call(InstallationService.setConfig, payload);
      if (response.code === 1) {
        yield put(routerRedux.push('/installation/migration'));
      } else {
        message.error(response.message);
      }
    },
    *migrateDatabase({ payload }, { call, put }) {
      try {
        const response: IResult<{ output: string }> = yield call(
          InstallationService.migrateDatabase
        );
        yield put({
          type: 'setMigrateLog',
          payload: response.payload.output,
        });
        message.success(response.message);
      } catch (e) {
        if (e.data) {
          const result = (e as ResponseError<IResult>).data;
          if (result.code === ResultCodes.DatabaseQueryFailed) {
            // 数据库请求失败
            yield put({
              type: 'setMigrationQueryFailed',
              payload: {
                status: true,
                message: result.message,
              },
            });
          } else {
            message.error(result.message);
          }
        }
      }
    },
  },

  reducers: {
    setMigrateLog(state: IInstallationState, { payload }) {
      state.migration.migrateLog = payload;
      state.migration.queryFailed = false;
      return state;
    },
    setMigrationQueryFailed(
      state: IInstallationState,
      { payload: { status, message: failedMessage } }
    ) {
      state.migration.queryFailed = status;
      state.migration.queryFailedMessage = failedMessage;
      return state;
    },
  },
};

export default model;
