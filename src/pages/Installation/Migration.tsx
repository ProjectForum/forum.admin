import React from 'react';
import { Button, Card, Input, Spin, Alert } from 'antd';
import { RouteProps } from 'react-router';
import router from 'umi/router';
import { Dispatch } from 'redux';
import { connect } from 'dva';
const styles = require('./Migration.less');
import { IInstallationState, IInstallationMigrationState } from './models/installation';

interface IProps extends RouteProps {
  migrationStore: IInstallationMigrationState;
  migrating: boolean;
  dispatch: Dispatch<any>;
}

@connect(({ installation, loading }) => ({
  migrationStore: (installation as IInstallationState).migration,
  migrating: loading.effects['installation/migrateDatabase'],
}))
class MigrationPage extends React.PureComponent<IProps> {
  initDatabase() {
    this.props.dispatch({
      type: 'installation/initDatabase',
    });
  }

  componentDidMount() {
    this.initDatabase();
  }

  render() {
    const { migrating, migrationStore } = this.props;
    return (
      <Card title="初始化数据库">
        {(() => {
          if (migrating) {
            return (
              <div>
                <p>我们正在为您初始化数据库中的表和数据。</p>

                <div className={styles.spin}>
                  <Spin />
                </div>
              </div>
            );
          } else if (migrationStore.queryFailed) {
            return (
              <div>
                <Alert
                  message="连接数据库失败，请检查您的数据库配置"
                  description={migrationStore.queryFailedMessage}
                  type="error"
                  showIcon
                />
                <Button className={styles.button} onClick={router.goBack}>
                  返回数据库配置
                </Button>
              </div>
            );
          } else {
            return (
              <div>
                <Alert message="初始化成功" type="success" showIcon />
                <Input.TextArea
                  style={{ marginTop: 20 }}
                  readOnly
                  autosize
                  value={migrationStore.migrateLog}
                />

                <Button
                  className={styles.button}
                  type="primary"
                  onClick={() => router.push('/installation/setting')}
                >
                  下一步
                </Button>
              </div>
            );
          }
        })()}
      </Card>
    );
  }
}

export default MigrationPage;
