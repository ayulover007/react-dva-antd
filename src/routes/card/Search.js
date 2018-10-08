import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Icon } from 'antd'
import { Cookie } from '../../utils'
import SearchGroup from '../../components/Search'

const Search = ({
  cardManage: {
    dayCardAvailable,
    monthCardAvailable,
    quarterCardAvailable
  },
  onAdd,
}) => {

  return (
    <Row gutter={24}>
      <Col lg={8} md={12} sm={16} xs={24} style={{marginBottom: 16}}>
      </Col>
      <Col lg={{offset: 8, span: 8}} md={12} sm={8} xs={24} style={{marginBottom: 16, textAlign: 'right'}}>
        <span>{Cookie.get('agent_type') === '0' ? '' : `您现在日卡余量有${dayCardAvailable}，月卡余量有${monthCardAvailable}，季卡余量有${quarterCardAvailable}` }</span>
        <Button type='ghost' onClick={onAdd}><Icon type="plus-circle-o" />创建</Button>
      </Col>
    </Row>
  )
}

Search.propTypes = {
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string
}

export default Search
