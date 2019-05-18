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
      yield call(InstallationService.setConfig, payload);
      yield put(routerRedux.push('/installation/migration'));
    },
    *initDatabase({ payload }, { call, put }) {
      try {
        const response: IResult<{ output: string }> = yield call(InstallationService.initDatabase);
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
    *setSetting({ payload }, { call, put }) {
      yield call(InstallationService.setSetting, payload);
      yield put(routerRedux.push('/installation/success'));
    },
  },

  reducers: {
    setMigrateLog(state: IInstallationState, { payload }): IInstallationState {
      return {
        ...state,
        migration: {
          migrateLog: payload,
          queryFailed: false,
          queryFailedMessage: '',
        },
      };
    },
    setMigrationQueryFailed(
      state: IInstallationState,
      { payload: { status, message: failedMessage } }
    ): IInstallationState {
      return {
        ...state,
        migration: {
          migrateLog: '',
          queryFailed: status,
          queryFailedMessage: failedMessage,
        },
      };
    },
  },
};

export default model;
