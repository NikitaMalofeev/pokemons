import styles from "./header.module.scss";
import wifi_icon from "../../icons/wifi.svg";
import battery_icon from "../../icons/battery.svg";
import signal_icon from "../../icons/signal.svg";

const Header = () => {
    return <div className="header">
                <div className={styles.header__container}>
                    <span className={styles.header__date}>9:41</span>
                    <div className={styles.header__icons}>
                        <div className={styles.icons__item}>
                            <img src={signal_icon}  alt="" />
                        </div>
                        <div className={styles.icons__item}>
                            <img src={wifi_icon}  alt="wifi" />
                        </div>
                        <div className={styles.icons__item}>
                            <img src={battery_icon}  alt="" />
                        </div>
                    </div>
                </div>
            </div>;
};

export default Header;