import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal, Icon } from 'antd'
import axios from 'axios';
import { Cookie } from '../../utils'
import MD5 from 'js-md5';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

const ModalForm = ({
  modal: { curItem, type, visible },
  loading,
  form: {
    getFieldDecorator,
    validateFields,
    resetFields
  },
  onOk,
  onCancel
}) => {
  function handleOk () {
    validateFields((errors, values) => {
      if (errors) {
        return
      }
      const data = {
        ...values,
        password: MD5(values.password),
        agentId: curItem.agentId,
        agentType: 1,
      }
      if(Cookie.get('agent_type') === '1') {
        data.parentAgentId = Cookie.get('agent_id');
        data.parentAgentName = Cookie.get('user_name');
      }
      onOk(data)
    })
  }

  const modalFormOpts = {
    title: type === 'create' ? <div><Icon type="plus-circle-o" /> 新建用户</div> : <div><Icon type="edit" /> 修改用户</div>,
    visible,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading,
    onOk: handleOk,
    onCancel,
    afterClose() {
      resetFields() //必须项，编辑后如未确认保存，关闭时必须重置数据
    }
  };

  const validateUserName = (rule, value, callback) => {
    if(type === 'update' && value !== curItem.username) {
      axios.get(newband.app.admin.API_HOST + '/video/agent/uniqUsername', {
        params: {
          username: value,
        }
      }).then((data) => {
        if (!data.data.data) {
          callback('登录名重复，请重新输入！');
        } else {
          callback();
        }
      })
    } else if(type === 'create') {
      axios.get(newband.app.admin.API_HOST + '/video/agent/uniqUsername', {
        params: {
          username: value,
        }
      }).then((data) => {
        if (!data.data.data) {
          callback('登录名重复，请重新输入！');
        } else {
          callback();
        }
      })
    } else {
      callback();
    }
  };

  return (
    <Modal {...modalFormOpts}>
      <Form>
        <FormItem label='登录名：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('username', {
            initialValue: curItem.username,
            rules: [
              {
                required: true,
                message: '登录名不能为空'
              },
              {
                max: 10,
                message: '登录名长度不能超过10位'
              },
              {
                validator: validateUserName,
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='代理商名：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('agentName', {
            initialValue: curItem.agentName,
            rules: [
              {
                required: true,
                message: '代理商名不能为空'
              },
              {
                max: 10,
                message: '代理商名长度不能超过10位'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='密码：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: curItem.password,
            rules: [
              {
                required: true,
                message: '登录密码不能为空'
              }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem label='手机号码：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: curItem.mobile,
            rules: [
              {
                max: 11,
                message: '手机号不能超过11位'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='微信号码：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('wechatNumber', {
            initialValue: curItem.wechatNumber,
            rules: [
              {
                max: 15,
                message: '微信号码不能超过15位'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='QQ号码：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('qqNumber', {
            initialValue: curItem.qqNumber,
            rules: [
              {
                max: 15,
                message: 'QQ号码不能超过15位'
              }
            ]
          })(<Input />)}
        </FormItem>

      </Form>
    </Modal>
  )
}

ModalForm.propTypes = {
  modal: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
}

export default Form.create()(ModalForm)
