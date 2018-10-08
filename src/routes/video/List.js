import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Button, Popover, Popconfirm, Avatar, Icon, Tag} from 'antd'
import styles from './List.less'
import {DataTable} from '../../components/'

const confirm = Modal.confirm;

function List ({
  videoManage: {
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
      title: '视频名',
      dataIndex: 'videoName',
      key: 'videoName'
    },
    {
      title: '封面图',
      dataIndex: 'coverUrl',
      key: 'coverUrl',
      render: (text) => {
        return <Avatar src={text} shape="square" size="default" icon="user" />
      }
    },
    {
      title: '视频预览',
      dataIndex: 'videoUrl',
      key: 'videoUrl',
      render: (text) => {
        if (text === null) {
          return '无';
        } else {
          return <Button type="default" size="small" onClick={() => window.open(text)}><Icon type="caret-right" /></Button>;
        }
      }
    }, {
      title: '是否推荐',
      dataIndex: 'recommend',
      key: 'recommend',
      render: (text) => {
        if(text === 0) {
          return '';
        } else if(text === 1) {
          return <Icon type="check" />
        }
      }
    }, {
      title: '是否已分类',
      dataIndex: 'isType',
      key: 'isType',
      render: (text) => {
        if (text === '0') {
          return <Tag color="#f50">未分类</Tag>;
        } else {
          return <Tag color="#2db7f5">已分类</Tag>;
        }
      }
    }, {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags'
    }, {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (text, record) => (
        <span>
          <Button type="primary" size="small" style={{marginRight: '10px'}} onClick={ () => onEdit(record) }>编辑</Button>
          <Popconfirm title="是否删除？" okText="确认" cancelText="取消" onConfirm = { () => onDelete(record.videoId) }>
            <Button type="danger" size="small">删除</Button>
          </Popconfirm>
        </span>
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
      rowKey={record => record.videoId}
    />
  )
}

List.propTypes = {
}

export default List
