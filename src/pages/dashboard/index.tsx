import React from 'react';
import { Card, Row, Col, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import Trend from '@/components/Trend';

function Dashboard() {
    return (
        <Row gutter={[3, 4]}>
            <Col xs={12} sm={8} md={8} lg={6}>
                <Card
                    title="创始会员"
                    extra={
                        <Tooltip title="下过订单即为用户">
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    style={{ padding: 2 }}
                >
                    <span style={{ fontSize: 20, marginRight: 20 }}>{10}</span>
                    增加
                    <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                        {5}
                    </Trend>
                </Card>
            </Col>
        </Row>
    );
}

export default Dashboard;