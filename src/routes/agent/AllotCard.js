import React from 'react'
import PropTypes from 'prop-types'
import { Cookie } from '../../utils'
import { Form, InputNumber, Select, Modal, Icon, message } from 'antd'

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

const AllotCardForm = ({
  agentManage,
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
        if(values.dayCardAvailable > agentManage.dayCardAvailable) {
          message.error(`日卡数量超限，目前可用日卡数量为${agentManage.dayCardAvailable}`);
          return;
        }
        if(values.monthCardAvailable > agentManage.monthCardAvailable) {
          message.error(`月卡数量超限，目前可用月卡数量为${agentManage.monthCardAvailable}`);
          return;
        }
        if(values.quarterCardAvailable > agentManage.quarterCardAvailable) {
          message.error(`季卡数量超限，目前可用季卡数量为${agentManage.quarterCardAvailable}`);
          return;
        }
      }
      const data = {
        ...values,
        agentId: agentManage.agentId
      }
      onOk(data)
    })
  }

  const modalFormOpts = {
    title: <div><Icon type="paper-clip" /> 卡密分配</div> ,
    visible: agentManage.allotFormVisible,
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
          {getFieldDecorator('dayCardAvailable', {
            initialValue: 0,
          })(<InputNumber step={10} min={0}/>)}
        </FormItem>
        <FormItem label='月卡数量：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('monthCardAvailable', {
            initialValue: 0,
          })(<InputNumber step={10} min={0}/>)}
        </FormItem>
        <FormItem label='季卡数量：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('quarterCardAvailable', {
            initialValue: 0,
          })(<InputNumber step={10} min={0}/>)}
        </FormItem>
      </Form>
    </Modal>
  )
}

AllotCardForm.propTypes = {
  agentManage: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
}

export default Form.create()(AllotCardForm)
