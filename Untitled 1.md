## 字体兼容性参考

| 格式     | IE   | Edge | Firefox | Chrome | Safari | Opera | iOS Safari | Android Browser | Chrome for Android |
| -------- | ---- | ---- | ------- | ------ | ------ | ----- | ---------- | --------------- | ------------------ |
| `.eot`   | 6    | --   | --      | --     | --     | --    | --         | --              | --                 |
| `.woff`  | 9    | 13   | 3.6     | 5      | 5.1    | 11.1  | 5.1        | 4.4             | 36                 |
| `.woff2` | --   | 14   | 39      | 36     | --     | 23    | --         | 50              | 50                 |
| `.ttf`   | --   | 13   | 3.5     | 4      | 3.1    | 10.1  | 4.3        | 2.2             | 36                 |
| `.svg`   | --   | --   | --      | 4      | 3.2    | 9.6   | 3.2        | 3               | 36                 |

来源：http://caniuse.com/#feat=fontface







```ts
/**
 * 使用 transResponse 轉換的res
 */
export interface TransformRes<DataRes = any> {
  status_code: number | string;
  data: DataRes;
  message: string;
  extra: any;
}

export enum GameStatus {
  /** 暂未上线 */
  Offline = 0,
  /** 开放下载 */
  Online = 1,
  /** 开放预约 */
  Reserve = 2
}

type TagProps = {
  text: string;
  type: 'default' | 'success' | 'error' | 'warning';
};

export const gameStatusTag: Record<GameStatus, TagProps> = {
  [GameStatus.Offline]: { text: '暂未上线', type: 'default' },
  [GameStatus.Online]: { text: '开放下载', type: 'success' },
  [GameStatus.Reserve]: { text: '开放预约', type: 'success' },
};

/** 游戏上线状态 */
export enum GameOnlineStatus {

}

export onlineStatusTag: Record<GameStatus, TagProps> = {

}
```

