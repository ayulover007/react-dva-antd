import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Icon } from 'antd'
import { Cookie } from '../../utils'
import SearchGroup from '../../components/Search'

const Search = ({
  agentManage: {
    dayCardAvailable,
    monthCardAvailable,
    quarterCardAvailable
  },
  field,
  keyword,
  onSearch,
  onAdd,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
}) => {
  const searchGroupProps = {
    field,
    keyword,
    select: true,
    selectOptions: [{ value: 'agentName', name: '代理商名' }],
    selectProps: {
      defaultValue: field || 'agentName'
    },
    onSearch: (value) => {
      onSearch(value)
    }
  }

  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{marginBottom: 16}}>
        <SearchGroup {...searchGroupProps}>
        </SearchGroup>
      </Col>
      <Col lg={{offset: 8, span: 8}} md={12} sm={8} xs={24} style={{marginBottom: 16, textAlign: 'right'}}>
        <span>{Cookie.get('agent_type') === '0' ? '' : `您现在日卡余量有${dayCardAvailable}，月卡余量有${monthCardAvailable}，季卡余量有${quarterCardAvailable}` }</span>
        <Button type='ghost' onClick={onAdd}><Icon type="plus-circle-o" />添加</Button>
      </Col>
    </Row>
  )
}

Search.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
}

export default Form.create()(Search)
