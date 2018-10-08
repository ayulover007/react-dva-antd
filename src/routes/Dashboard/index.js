import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {Row, Col, Card, Icon, Select} from 'antd'
import Collection from './collection';
import styles from './index.less'

const Option = Select.Option;

function Dashboard ({dashboard, dispatch}) {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      padding: 5,
      x: 'left',
      data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
      {
        name:'访问来源',
        type:'pie',
        radius : '65%',
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        grid: {
          left: '1%',
          right: '1%',
          top: '1%',
          bottom: '1%',
        },
        data:[
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
          {value:135, name:'视频广告'},
          {value:1548, name:'搜索引擎'}
        ]
      }
    ]
  };

  const collectProps = {
    dashboard,
    onMemberAddSelectChange(data) {
      dispatch({
        type: 'dashboard/memberAddSelectChange',
        payload: data
      })
    }
  };

  return (
      <Row gutter={24}>
        <div className="content-dashboard">
          <Collection {...collectProps}/>
        </div>
      </Row>
  )
}

Dashboard.propTypes = {
  weather: PropTypes.object,
  sales: PropTypes.array,
  quote: PropTypes.object,
  numbers: PropTypes.array,
  recentSales: PropTypes.array,
  comments: PropTypes.array,
  completed: PropTypes.array,
  browser: PropTypes.array,
  cpu: PropTypes.object,
  user: PropTypes.object
}

export default connect(({dashboard}) => ({dashboard}))(Dashboard)
