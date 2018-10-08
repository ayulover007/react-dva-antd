import React from 'react';
import PropTypes from 'prop-types';
import TypeSearch from './Search';
import TypeList from './List';
import TypeForm from './ModalForm';
import {connect} from 'dva';
import {routerRedux} from "dva/router";

function Video({ location, dispatch, videoManage, loading, modal }) {

  const {field, keyword} = location.query;

  const searchProps = {
    field,
    keyword,
    onSearch(value) {
      const search = {};
      search[value.field] = value.keyword;
      const { pathname } = location;
      if(value.keyword.length) {
        dispatch(routerRedux.push({
          pathname,
          query: {
            ...search
          },
        }));
      } else {
        dispatch(routerRedux.push({pathname}));
      }
    },
    onAdd() {
      dispatch({
        type: 'videoManage/showModal',
        payload: {
          type: 'create',
          curItem: {}
        }
      })
    }
  };

  const listProps = {
    videoManage,
    loading,
    location,
    onEdit(data) {
      dispatch({
        type: 'videoManage/showModal',
        payload: {
          type: 'update',
          curItem: data
        }
      })
    },
    onDelete(data) {
      dispatch({
        type: 'videoManage/deleteVideo',
        payload: data
      })
    },
  };

  const modalProps = {
    modal,
    loading,
    onOk(data) {
      dispatch({
        type: !!data.videoId
          ? 'videoManage/update'
          : 'videoManage/create',
        payload: {
          curItem: data
        }
      })
    },
    onCancel() {
      dispatch({type: 'modal/hideModal'})
    }
  };

  return (
    <div className="content-inner">
      <TypeSearch {...searchProps}/>
      <TypeList {...listProps} />
      <TypeForm {...modalProps} />
    </div>
  )
}

Video.propTypes = {
  dispatch: PropTypes.func
}

function mapStateToProps({ videoManage, loading, modal }) {
  return { videoManage, modal, loading: loading.models.videoManage }
}

export default connect(mapStateToProps)(Video)
