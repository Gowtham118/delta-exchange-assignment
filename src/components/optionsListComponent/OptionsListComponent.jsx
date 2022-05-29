import { Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import deltaExchangeLogo from "../../assets/delta-exchange-logo.png";

import styles from "./optionsListComponent.module.scss";

const OptionsListComponent = ({ data, loading, markPrices }) => {
  return (
    <div>
      <header className={styles.header}>
        <img src={deltaExchangeLogo} alt="Delta Exchange" />
      </header>
      <main className={styles.main}>
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Description</th>
              <th>Underlying Asset</th>
              <th>Mark Price</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {!loading && data.result ? (
              data.result.map((item) => (
                <tr key={item.symbol}>
                  <td>{item.symbol}</td>
                  <td className={styles.descriptionCol}>{item.description}</td>
                  <td>{item.underlying_asset.name}</td>
                  <td>
                    {Object.keys(markPrices).length ? (
                      markPrices[item.symbol]
                    ) : (
                      <Spin indicator={<LoadingOutlined />} />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <section className={styles.loadingIconContainer}>
                <Spin
                  indicator={
                    <LoadingOutlined
                      className={styles.loadingIconContainer__icon}
                    />
                  }
                />
              </section>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default OptionsListComponent;
