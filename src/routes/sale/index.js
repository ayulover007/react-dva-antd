import React from 'react';
import PropTypes from 'prop-types';
import SaleList from './List';
import SaleModal from './ModalForm';
import {connect} from 'dva';

function Sale({ location, dispatch, saleManage, loading, modal }) {

  const listProps = {
    saleManage,
    loading,
    location,
    onEdit(data) {
      console.log(data);
      dispatch({
        type: 'saleManage/showModal',
        payload: {
          type: 'update',
          curItem: data
        }
      })
    }
  };

  const modalProps = {
    saleManage,
    modal,
    loading,
    onOk(data) {
      dispatch({
        type: 'saleManage/update',
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
      <SaleList {...listProps} />
      <SaleModal {...modalProps}/>
    </div>
  )
}

Sale.propTypes = {
  dispatch: PropTypes.func
}

function mapStateToProps({ saleManage, loading, modal }) {
  return { saleManage, modal, loading: loading.models.saleManage }
}

export default connect(mapStateToProps)(Sale)
