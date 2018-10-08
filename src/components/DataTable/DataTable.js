import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import {Table} from 'antd'
import classnames from 'classnames'
import TableBodyWrapper from './TableBodyWrapper'

function DataTable({dispatch, location, className, pagination, animate, ...props}) {

  const getBodyWrapperProps = {
    page: location.query.page || 1,
    current: pagination.current || 1
  }

  const getBodyWrapper = (body) => (<TableBodyWrapper {...getBodyWrapperProps} body={body}/>)

  const onPageChange = (page, filters) => {
    console.log(filters);
    const {query} = location;
    const pathname = location.pathname;
    const checkFilter = {};
    if(Object.keys(filters).length > 0) {
      for(const key in filters) {
        checkFilter[key] = filters[key];
      }
    }
    dispatch(routerRedux.push({
      pathname: pathname,
      query: {
        ...query,
        page: page.current,
        rows: page.pageSize,
        ...checkFilter
      }
    }))
  }

  let tableProps = {
    simple: true,
    bordered: true,
    scroll: {x: 1200},
    onChange: onPageChange,
    pagination: !!pagination && {...pagination, showSizeChanger: true, showQuickJumper: true, showTotal: total => `共 ${total} 条`},
    ...props
  }
  if(animate) {
    tableProps.getBodyWrapper = getBodyWrapper
    tableProps.className = classnames(className, "table-motion")
  }

  return (
    <Table {...tableProps}/>
  )
}

DataTable.propTypes = {
  animate: PropTypes.bool,
  rowKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]).isRequired,
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  className: PropTypes.string
}

DataTable.defaultProps = {
  animate: true
}

function mapStateToProps({ routing, app }) {
  return { location: routing.locationBeforeTransitions }
}

export default connect(mapStateToProps)(DataTable)
