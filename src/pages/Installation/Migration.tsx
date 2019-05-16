import React from 'react';
import { Button, Card, Input, Spin } from 'antd';
import { RouteProps } from 'react-router';
import router from 'umi/router';
import { Dispatch } from 'redux';
import { connect } from 'dva';
const styles = require('./Migration.less');
import { IInstallationState, IInstallationMigrationState } from './models/installation';

interface IProps extends RouteProps {
  migrateLog: string;
  migrating: boolean;
  dispatch: Dispatch<any>;
}

@connect(({ installation, loading }) => ({
  migrateLog: (installation as IInstallationState).migration.migrateLog,
  migrating: loading.effects['installation/migrateDatabase'],
}))
class MigrationPage extends React.PureComponent<IProps> {
  startMigrate() {
    this.props.dispatch({
      type: 'installation/migrateDatabase',
    });
  }

  componentDidMount() {
    this.startMigrate();
  }

  render() {
    const { migrating, migrateLog } = this.props;
    console.log(migrating);
    return (
      <Card>
        <p>我们正在为您初始化数据库中的表和数据。</p>

        {(() => {
          if (migrating) {
            return (
              <div className={styles.spin}>
                <Spin />
              </div>
            );
          } else {
            return (
              <Input.TextArea style={{ marginTop: 20 }} readOnly autosize value={migrateLog} />
            );
          }
        })()}
      </Card>
    );
  }
}

export default MigrationPage;
