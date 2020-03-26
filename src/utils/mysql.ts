import deepmerge from 'deepmerge';
import missModuleMessage from './miss-module-message';

/** 访问日志中间件选项参数 */
export interface MysqlOptions {
  /** 是否启用 */
  enable?: boolean;
  options?: {
    zkConnection: string;
    namespace: string;
    host: string;
    port: string;
    user: string;
    password: string;
    database: string;
    connectionLimit?: string;
    timeout?: string;
  };
}

let mysqlInstance: any;

const {
  MYSQL_TIMEOUT
} = process.env;

/**
 * 初始化pxc实例
 * 一定要在query之前调用
 */
export const init = (opts: MysqlOptions = {}) => {
  const {
    MYSQL_ENABLE,
    MYSQL_ZKCONNECTION,
    MYSQL_NAMESPACE,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_CONNECTIONLIMIT,
    MYSQL_ACQUIRETIMEOUT
  } = process.env;
  const defaultOptions = {
    enable: MYSQL_ENABLE === 'true',
    options: {
      zkConnection: MYSQL_ZKCONNECTION,
      namespace: MYSQL_NAMESPACE,
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      connectionLimit: MYSQL_CONNECTIONLIMIT,
      acquireTimeout: MYSQL_ACQUIRETIMEOUT
    }
  };

  const {
    enable,
    options: {
      zkConnection,
      namespace,
      host,
      port,
      user,
      password,
      database,
      connectionLimit,
      acquireTimeout
    }
  } = deepmerge(defaultOptions, opts);

  if (enable) {
    let mysqlPxc: any;
    try {
      // eslint-disable-next-line global-require
      mysqlPxc = require('@qnpm/mysql-pxc');
    } catch (e) {
      missModuleMessage('@qnpm/mysql-pxc');
      throw e;
    }
    // eslint-disable-next-line global-require
    mysqlInstance = mysqlPxc.createWriteDelegator({
      zkConnection,
      namespace,
      options: {
        host,
        port,
        user,
        password,
        database,
        connectionLimit,
        acquireTimeout
      }
    });
  }
};

/**
 * 执行sql
 * 参数sql和data同Mysql模块的query方法
 * 返回promise
 */
export const query = async (sql: string, data = {}) => {
  const connection = await mysqlInstance.getConnection();
  const queryOptions = {
    sql,
    values: data,
    timeout: MYSQL_TIMEOUT // 查询的超时时间
  };
  const results = await new Promise((resolve, reject) => {
    connection.query(queryOptions, (err, res) => {
      connection.release();
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
  return results;
};

/**
 * 关闭mysql pool
 */
export const end = () => {
  mysqlInstance.end();
};
