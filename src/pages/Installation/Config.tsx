import React, { FormEvent } from 'react';
import { Form, Input, Button, Card, InputNumber } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { RouteProps } from 'dva/router';
import { Dispatch } from 'redux';
import { connect } from 'dva';
const styles = require('./Config.less');

interface IProps extends FormComponentProps, RouteProps {
  dispatch: Dispatch<any>;
}

@connect(({ installation }) => ({}))
@Form.create()
class ConfigPage extends React.PureComponent<IProps> {
  handleSubmit = (e: FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'installation/setConfig',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <div>
        <Form
          className={styles.form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          labelAlign="left"
          onSubmit={this.handleSubmit}
        >
          <Card title="应用信息">
            <Form.Item label="站点名称">
              {getFieldDecorator('appName', {
                rules: [{ required: true, message: '站点名称不能为空' }],
                initialValue: '测试',
              })(<Input placeholder="您的站点名称" />)}
            </Form.Item>
            <Form.Item label="站点地址">
              {getFieldDecorator('appUrl', {
                rules: [{ required: true, message: '站点地址不能为空' }],
                initialValue: window.location.origin,
              })(<Input placeholder="您的站点地址" />)}
            </Form.Item>
          </Card>
          <Card title="数据库信息" style={{ marginTop: 10 }}>
            <Form.Item label="数据库名">
              {getFieldDecorator('dbDatabase', {
                rules: [{ required: true, message: '数据库名不能为空' }],
                initialValue: 'forum',
              })(<Input placeholder="希望安装的到的数据库" />)}
            </Form.Item>
            <Form.Item label="用户名">
              {getFieldDecorator('dbUsername', {
                rules: [{ required: true, message: '数据库用户名不能为空' }],
                initialValue: 'root',
              })(<Input placeholder="您的数据库用户名" />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('dbPassword', {
                initialValue: 'root',
              })(<Input placeholder="您的数据库密码" />)}
            </Form.Item>
            <Form.Item label="数据库主机">
              {getFieldDecorator('dbHost', {
                rules: [{ required: true, message: '数据库主机地址不能为空' }],
                initialValue: 'localhost',
              })(<Input placeholder="您的数据库主机地址" />)}
            </Form.Item>
            <Form.Item label="数据库端口">
              {getFieldDecorator('dbPort', {
                rules: [{ required: true, message: '数据库端口不能为空' }],
                initialValue: 8889,
              })(<InputNumber placeholder="端口" />)}
            </Form.Item>
            <Form.Item label="表前缀">
              {getFieldDecorator('dbPrefix', {
                initialValue: 'forum_',
              })(<Input placeholder="您的数据库主机地址" />)}
            </Form.Item>
            <Form.Item style={{ marginTop: 30, marginBottom: 0 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </div>
    );
  }
}

export default ConfigPage;
