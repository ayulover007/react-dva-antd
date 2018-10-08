import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Icon, message, InputNumber } from 'antd'
import { Cookie } from '../../utils'

const FormItem = Form.Item;

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
        saleId: curItem.saleId,
      }
      onOk(data)
    })
  }

  const modalFormOpts = {
    title: <div><Icon type="edit" /> 修改总价</div>,
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
        <FormItem label='总价：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('totalPrice', {
            initialValue: curItem.totalPrice,
            rules: [
              {
                min: 0,
                message: '金额不能少于0'
              }
            ]
          })(<InputNumber />)}
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
