import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Button, Popover, Popconfirm} from 'antd'
import styles from './List.less'
import {DataTable} from '../../components/'

const confirm = Modal.confirm;

function List ({
  cardManage: {
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
      title: '卡号',
      dataIndex: 'number',
      key: 'number',
      render: (text, record) => {
        return record.numberPassword.split('-')[0]
      }
    }, {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      render: (text, record) => {
        return record.numberPassword.split('-')[1]
      }
    }, {
      title: '类型',
      dataIndex: 'cardType',
      key: 'cardType',
      filters: [{
        text: '日卡',
        value: 1,
      }, {
        text: '月卡',
        value: 2,
      }, {
        text: '季卡',
        value: 3,
      }],
      filterMultiple: false,
      render: (text) => {
        if(text === 1) {
          return '日卡';
        } else if(text === 2) {
          return '月卡'
        } else {
          return '季卡'
        }
      },
      onFilter: (value, record) => {
        return true;
      },
    }, {
      title: '状态',
      dataIndex: 'cardStatus',
      key: 'cardStatus',
      filters: [{
        text: '未使用',
        value: 1,
      }, {
        text: '已使用',
        value: 0,
      }],
      filterMultiple: false,
      onFilter: (value, record) => {
        return true;
      },
      render: (text) => (text === 1 ? '未使用' : '已使用')
    }, {
      title: '使用时间',
      dataIndex: 'useDate',
      key: 'useDate'
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate'
    }
  ]

  return (
    <DataTable
      className={styles.table}
      columns={columns}
      dataSource={list}
      loading={loading}
      pagination={pagination}
      rowKey={record => record.cardId}
    />
  )
}

List.propTypes = {
  cardManage: PropTypes.object.isRequired,
}

export default List
