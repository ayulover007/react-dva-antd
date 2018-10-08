import React from 'react';
import PropTypes from 'prop-types';
import CardList from './List';
import CardSearch from './Search';
import CardModal from './ModalForm';
import {connect} from 'dva';

function Card({ location, dispatch, cardManage, loading, modal }) {

  const searchProps = {
    cardManage,
    onAdd() {
      dispatch({
        type: 'modal/showModal',
        payload: {
          type: 'create'
        }
      })
    }
  };

  const listProps = {
    cardManage,
    loading,
    location
  };

  const modalProps = {
    cardManage,
    modal,
    loading,
    onOk(data) {
      dispatch({
        type: 'cardManage/create',
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
      <CardSearch {...searchProps}/>
      <CardList {...listProps} />
      <CardModal {...modalProps}/>
    </div>
  )
}

Card.propTypes = {
  dispatch: PropTypes.func
}

function mapStateToProps({ cardManage, loading, modal }) {
  return { cardManage, modal, loading: loading.models.cardManage }
}

export default connect(mapStateToProps)(Card)
