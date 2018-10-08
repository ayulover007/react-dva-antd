import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal, Icon, message, InputNumber } from 'antd'
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
  cardManage: {
    dayCardAvailable,
    monthCardAvailable,
    quarterCardAvailable
  },
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
      const type = Cookie.get('agent_type');
      if(type !== '0') {
        if(values.dayNum > dayCardAvailable) {
          message.error(`日卡数量超限，目前可用日卡数量为${dayCardAvailable}`);
          return;
        }
        if(values.monthNum > monthCardAvailable) {
          message.error(`月卡数量超限，目前可用月卡数量为${monthCardAvailable}`);
          return;
        }
        if(values.quarterNum > quarterCardAvailable) {
          message.error(`季卡数量超限，目前可用季卡数量为${quarterCardAvailable}`);
          return;
        }
      }
      const data = {
        ...values,
        agentId: Cookie.get('agent_id')
      }
      onOk(data)
    })
  }

  const modalFormOpts = {
    title: <div><Icon type="plus-circle-o" /> 创建卡密</div>,
    visible,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading,
    onOk: handleOk,
    onCancel,
    afterClose() {
      resetFields() //必须项，编辑后如未确认保存，关闭时必须重置数据
    }
  }

  return (
    <Modal {...modalFormOpts}>
      <Form>
        <FormItem label='日卡数量：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('dayNum', {
            initialValue: 0,
          })(<InputNumber step={10} min={0}/>)}
        </FormItem>
        <FormItem label='月卡数量：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('monthNum', {
            initialValue: 0,
          })(<InputNumber step={10} min={0}/>)}
        </FormItem>
        <FormItem label='季卡数量：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('quarterNum', {
            initialValue: 0,
          })(<InputNumber step={10} min={0}/>)}
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
