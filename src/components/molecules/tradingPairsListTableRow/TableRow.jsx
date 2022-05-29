import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const TableRow = ({item,markPrices}) => {
    return (
        <tr>
        <td>{item.symbol}</td>
        <td style={{maxWidth: "32rem"}}>{item.description}</td>
        <td>{item.underlying_asset.name}</td>
        <td>
          {Object.keys(markPrices).length ? (
            markPrices[item.symbol]
          ) : (
            <Spin indicator={<LoadingOutlined />} />
          )}
        </td>
      </tr>
        );
}

export default React.memo(TableRow);
