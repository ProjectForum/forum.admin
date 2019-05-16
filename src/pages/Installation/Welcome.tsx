import React from 'react';
import { Button, Card } from 'antd';
import { RouteProps } from 'react-router';
import router from 'umi/router';

class WelcomePage extends React.PureComponent<RouteProps> {
  onStartClick() {
    router.push('/installation/config');
  }

  render() {
    return (
      <Card>
        <p>欢迎使用Forum，我们需要您数据库的一些信息用于安装论坛程序。</p>

        <Button type="primary" onClick={this.onStartClick}>
          开始安装
        </Button>
      </Card>
    );
  }
}

export default WelcomePage;
