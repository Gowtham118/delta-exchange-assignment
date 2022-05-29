import { Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import deltaExchangeLogo from "../../assets/delta-exchange-logo.png";

import styles from "./tradingPairsList.module.scss";
import TableRow from "../molecules/tradingPairsListTableRow/TableRow";

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
                <TableRow item={item} markPrices={markPrices}/>
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
