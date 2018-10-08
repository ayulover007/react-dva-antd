import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Button, Popover, Popconfirm} from 'antd'
import styles from './List.less'
import {DataTable} from '../../components/'

const confirm = Modal.confirm;

function List ({
  userManage: {
    list,
    pagination
  },
  loading,
  location,
  onReset
}) {


  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    }, {
      title: '用户类型',
      dataIndex: 'userType',
      key: 'userType',
      render: (text) => {
        if(text === 2) {
          return '高级会员';
        } else if(text === 1) {
          return '普通会员'
        }
      }
    }, {
      title: '邀请码',
      dataIndex: 'invitationCode',
      key: 'invitationCode'
    }, {
      title: '会员过期时间',
      dataIndex: 'expireDate',
      key: 'expireDate',
      render: (value) => new Date(value).format("yyyy-MM-dd HH:mm:ss")
    }, {
      title: '注册时间',
      dataIndex: 'createDate',
      key: 'createDate'
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => (
        <Popconfirm title="是否重置密码？" okText="确认" cancelText="取消" onConfirm = { () => onReset(record.userId) }>
          <Button type="primary" size="small">重置密码</Button>
        </Popconfirm>
      )
    }
  ]

  return (
    <DataTable
      className={styles.table}
      columns={columns}
      dataSource={list}
      loading={loading}
      pagination={pagination}
      rowKey={record => record.userId}
    />
  )
}

List.propTypes = {
}

export default List
