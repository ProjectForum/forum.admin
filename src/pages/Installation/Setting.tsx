import React, { FormEvent } from 'react';
import { Form, Input, Button, Card } from 'antd';
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
class SettingPage extends React.PureComponent<IProps> {
  handleSubmit = (e: FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'installation/setSetting',
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
          <Card title="管理员设置">
            <Form.Item label="用户名">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '管理员用户名不能为空' }],
                initialValue: 'admin',
              })(<Input placeholder="管理员的用户名" />)}
            </Form.Item>
            <Form.Item label="电子邮箱">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '管理员电子邮箱不能为空' }],
                initialValue: 'admin@example.com',
              })(<Input placeholder="管理员的电子邮箱" type="email" />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: '管理员密码不能为空' },
                  { min: 8, message: '管理员密码不能小于8位' },
                ],
              })(<Input.Password placeholder="管理员的密码，不小于8位" />)}
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

export default SettingPage;
