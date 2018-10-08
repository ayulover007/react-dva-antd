import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, Card, Icon, Select} from 'antd'
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';

const Option = Select.Option;

const Collection = ({dashboard, loading, onMemberAddSelectChange}) => {

  const option = {
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '15%',
      bottom: '5%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['日卡', '月卡', '季卡'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'直接访问',
        type:'bar',
        barWidth: '30%',
        data:[10, 52, 200]
      }
    ]
  };

  const memberCountOption = {
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '15%',
      bottom: '5%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['日卡', '月卡', '季卡'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'总数',
        type:'bar',
        barWidth: '30%',
        data: dashboard.memberCount
      }
    ]
  };

  const memberAddedOption = {
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '15%',
      bottom: '5%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['日卡', '月卡', '季卡'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'总数',
        type:'bar',
        barWidth: '30%',
        data: dashboard.memberStatus[dashboard.memberAddSelect]
      }
    ]
  };

  const cardTotalOptions = {
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '15%',
      bottom: '5%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['日卡', '月卡', '季卡'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'总数',
        type:'bar',
        barWidth: '30%',
        data: dashboard.cardTotalStatus
      }
    ]
  };

  const cardUsedOptions = {
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '15%',
      bottom: '5%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['日卡', '月卡', '季卡'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'已使用',
        type:'bar',
        barWidth: '30%',
        stack: 'sum',
        data: dashboard.cardUsedStatus,
        itemStyle:{
          normal: {color: '#f04134'}
        }
      },
      {
        name:'总数',
        type:'bar',
        barWidth: '30%',
        stack: 'sum',
        data: dashboard.cardTotalStatus,

        itemStyle:{
          normal: {color: '#108ee9'}
        }
      }
    ]
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title={<div><Icon type="bank" style={{marginRight: '10px'}} />销售额</div>} bordered={false}>
            <div style={{fontSize: 50, textAlign: 'center', color: '#108ee9', height: '150px', lineHeight: '150px'}}>￥{dashboard.total}</div>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title={<div><Icon type="red-envelope" style={{marginRight: '10px'}} />销售增额</div>}
            bordered={false}
          >
            <div style={{fontSize: 20, textAlign: 'center', color: '#108ee9', height: '150px'}}>
              <p style={{paddingTop: '30px'}}>日增：￥{dashboard.salaryStatus[0]}</p>
              <p>周增：￥{dashboard.salaryStatus[1]}</p>
              <p>月增：￥{dashboard.salaryStatus[2]}</p>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Card title={<div><Icon type="user" style={{marginRight: '10px'}}/>注册用户总数</div>} bordered={false}>
            <div style={{fontSize: 50, textAlign: 'center', color: '#00a854', height: '150px', lineHeight: '150px'}}>{dashboard.userSize}</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={<div><Icon type="schedule" style={{marginRight: '10px'}} />新增注册用户</div>}
            bordered={false}
          >
            <div style={{fontSize: 20, textAlign: 'center', color: '#f04134', height: '150px'}}>
              <p style={{paddingTop: '30px'}}>日增：{dashboard.userAdded[0]}</p>
              <p>周增：{dashboard.userAdded[1]}</p>
              <p>月增：{dashboard.userAdded[2]}</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card title={<div><Icon type="user-add" style={{marginRight: '10px'}} />会员总数</div>} bordered={false}>
            <ReactEchartsCore
              echarts={echarts}
              option={memberCountOption}
              notMerge={true}
              style={{height: '150px'}}
              lazyUpdate={true} />
          </Card>
        </Col>
        <Col span={6} >
          <Card
            extra={
              <Select onChange={(value) => onMemberAddSelectChange(value)} defaultValue="1" size="small" style={{width: '60px'}}>
                <Option value="1">日增</Option>
                <Option value="2">月增</Option>
                <Option value="3">季增</Option>
              </Select>
            }
            title={<div><Icon type="red-envelope" style={{marginRight: '10px'}} />新增会员数量</div>}
            bordered={false}
          >
            <ReactEchartsCore
              echarts={echarts}
              option={memberAddedOption}
              notMerge={true}
              style={{height: '150px'}}
              lazyUpdate={true} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}>
          <Card title={<div><Icon type="user" style={{marginRight: '10px'}}/>代理商总数</div>} bordered={false}>
            <div style={{fontSize: 50, textAlign: 'center', color: '#00a854', height: '150px', lineHeight: '150px'}}>{dashboard.agentSize}</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={<div><Icon type="user-add" style={{marginRight: '10px'}} />新增代理商</div>}
            bordered={false}
          >
            <div style={{fontSize: 20, textAlign: 'center', color: '#108ee9', height: '150px'}}>
              <p style={{paddingTop: '30px'}}>日增：{dashboard.agentStatus[0]}</p>
              <p>周增：{dashboard.agentStatus[1]}</p>
              <p>月增：{dashboard.agentStatus[2]}</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={<div><Icon type="credit-card" style={{marginRight: '10px'}} />充值卡总数</div>}
            bordered={false}
          >
            <div style={{fontSize: 50, textAlign: 'center', color: '#f04134', height: '150px', lineHeight: '150px'}}>
              <ReactEchartsCore
                echarts={echarts}
                option={cardTotalOptions}
                notMerge={true}
                style={{height: '150px'}}
                lazyUpdate={true} />
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={<div><Icon type="schedule" style={{marginRight: '10px'}} />充值卡使用情况</div>}
            bordered={false}
          >
            <ReactEchartsCore
              echarts={echarts}
              option={cardUsedOptions}
              notMerge={true}
              style={{height: '150px'}}
              lazyUpdate={true} />
          </Card>
        </Col>
      </Row>
    </div>
  )
};

Collection.propTypes = {
}

export default Collection
