import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Button, Popover, Popconfirm} from 'antd'
import styles from './List.less'
import {DataTable} from '../../components/'

const confirm = Modal.confirm;

function List ({
  allotManage: {
    list,
    pagination
  },
  loading,
  location,
  onEdit,
  onDelete
}) {


  const columns = [
    {
      title: '代理商名',
      dataIndex: 'targetAgentName',
      key: 'targetAgentName'
    }, {
      title: '分销数量',
      dataIndex: 'allotNumber',
      key: 'allotNumber'
    }, {
      title: '卡类型',
      dataIndex: 'cardType',
      key: 'cardType',
      render: (text) => {
        if(text === 1) {
          return '日卡';
        } else if(text === 2) {
          return '月卡'
        } else {
          return '季卡'
        }
      }
    }, {
      title: '分销时间',
      dataIndex: 'allotDate',
      key: 'allotDate'
    }
  ]

  return (
    <DataTable
      className={styles.table}
      columns={columns}
      dataSource={list}
      loading={loading}
      pagination={pagination}
      rowKey={record => record.allotId}
    />
  )
}

List.propTypes = {
}

export default List
