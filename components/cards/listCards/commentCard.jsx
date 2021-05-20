import { Typography } from "@material-ui/core";
import Link from "next/link";
import styles from "assets/css/cards/commentCard.module.css";

import TimeAgo from "timeago-react"; // var TimeAgo = require('timeago-react');
import ru from "timeago.js/lib/lang/ru";
import * as timeago from "timeago.js";

export default function ListCardComment({ data }) {
  timeago.register("ru", ru);

  return (
    <div className={`${styles.wrap}`}>
      <div>
        <img
          className={styles.user}
          src={data.user.avatar}
          alt={data.user.nickname}
        />
      </div>
      <div className={styles.body_wrap}>
        <div className={styles.header}>
          <div className={styles.nickname}>{data.user.nickname}</div>
          <small className={styles.time}>
            <TimeAgo datetime={data.user.updated_at} locale="ru" />
          </small>
        </div>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{
            __html: data.html_body,
          }}
        ></div>
      </div>
    </div>
  );
}
