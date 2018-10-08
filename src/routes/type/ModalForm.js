import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal, Icon, InputNumber } from 'antd'

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
  modal: { curItem, type, visible, rootType },
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
        typeId: curItem.typeId,
      }
      onOk(data)
    })
  }

  const modalFormOpts = {
    title: type === 'create' ? <div><Icon type="plus-circle-o" /> 新建分类</div> : <div><Icon type="edit" /> 修改分类</div>,
    visible,
    wrapClassName: 'vertical-center-modal',
    confirmLoading: loading,
    onOk: handleOk,
    onCancel,
    afterClose() {
      resetFields() //必须项，编辑后如未确认保存，关闭时必须重置数据
    }
  };


  return (
    <Modal {...modalFormOpts}>
      <Form>
        <FormItem label='分类名：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('typeName', {
            initialValue: curItem.typeName,
            rules: [
              {
                required: true,
                message: '分类名不能为空'
              },
              {
                max: 10,
                message: '分类名长度不能超过8位'
              },
            ]
          })(<Input />)}
        </FormItem>
        <FormItem label='上级分类：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('parentId', {
            initialValue: curItem.parentId === undefined ? '-1' : curItem.parentId,
            rules: [
              {
                required: true,
                message: '上级分类不能为空'
              }
            ]
          })(
            <Select>
              <Option value="-1">无</Option>
              {
                rootType === undefined || rootType === null ? '' : rootType.map((type) => <Option key={type.typeId} value={type.typeId}>{type.typeName}</Option>)
              }
            </Select>
            )}
        </FormItem>
        <FormItem label='权重：' hasFeedback {...formItemLayout}>
          {getFieldDecorator('weight', {
            initialValue: curItem.weight,
            rules: [
              {
                required: true,
                message: '权重不能为空'
              }
            ]
          })(
            <InputNumber max={100} min={1}/>
          )}
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
