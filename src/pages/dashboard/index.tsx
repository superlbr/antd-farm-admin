import React from 'react';
import { Row, Col, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import ChartCard from '@/components/ChartCard';
import Trend from '@/components/Trend';

function Dashboard() {
    return (
        <Row gutter={[3, 4]}>
            <Col xs={12} sm={8} md={8} lg={6}>
                <ChartCard
                    title="创始会员"
                    action={
                        <Tooltip title="下过订单即为用户">
                            <InfoCircleOutlined />
                        </Tooltip>
                    }
                    bodyStyle={{ padding: 20 }}
                    total={() => 20 }
                    contentHeight={46}
                >
                    <span>
                        增加
                        <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                            {5}
                        </Trend>
                    </span>
                </ChartCard>
            </Col>
        </Row>
    );
}

export default Dashboard;