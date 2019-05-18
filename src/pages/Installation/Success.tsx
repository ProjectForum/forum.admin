import React from 'react';
import { Button, Card, Alert } from 'antd';
import { RouteProps } from 'react-router';
import router from 'umi/router';

class WelcomePage extends React.PureComponent<RouteProps> {
  onStartClick() {
    router.push('/installation/config');
  }

  render() {
    return (
      <Card title="安装完成">
        <Alert message="恭喜" description="您已经成功完成了安装！" type="success" />
        <Button type="primary" style={{ marginTop: 18 }} onClick={() => router.push('/user/login')}>
          完成
        </Button>
      </Card>
    );
  }
}

export default WelcomePage;
