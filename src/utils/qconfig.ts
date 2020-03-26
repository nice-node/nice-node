import { resolve } from 'path';
import { existsSync } from 'fs';
import deepmerge from 'deepmerge';
import missModuleMessage from './miss-module-message';

let qconfigClient: any;

export interface QconfigOptions {
  enable?: boolean;
  options?: {
    name: string;
    token: string;
    properties?: string[];
    timerInterval?: number;
    logPath?: string;
    useCluster?: boolean;
  }
}

/**
 * 在灰度或者prod环境下检查拉取到的qconnfig是否是线上环境
 */
// const prodReg = /prod|prepare/;
// function checkQconfigEnv(): void {
//   // 这里需要检查环境进行，环境的拉取判断
//   if (prodReg.test(NODE_ENV)) {
//     const qconfigEnv = profileConfig.rawValue('env');

//     if (qconfigEnv !== 'prod') {
//       throw new Error(`qconfig环境检查失败，拉取到的配置文件环境是: ${qconfigEnv}`);
//     }
//   }
// }

/**
 * 执行初始化config
 */
export const initQconfig = async (opts: QconfigOptions = {}) => {
  const {
    QCONFIG_ENABLE,
    QCONFIG_TOKEN,
    QCONFIG_PROPERTIES,
    QCONFIG_TIMERINTERVAL,
    QCONFIG_USECLUSTER,
    APP_CODE,
    LOG_ROOT = ''
  } = process.env;

  // qconfigClient初始化参数
  const defaultOptions = {
    enable: QCONFIG_ENABLE === 'true',
    options: {
      name: APP_CODE,
      token: QCONFIG_TOKEN,
      properties: QCONFIG_PROPERTIES?.split(','),
      timerInterval: QCONFIG_TIMERINTERVAL,
      logPath: resolve(LOG_ROOT),
      useCluster: QCONFIG_USECLUSTER === 'true'
    }
  };

  const {
    enable,
    options
  } = deepmerge(defaultOptions, opts);

  if (enable) {
    const files = ['pom.xml', 'package.json'];
    if (files.every((file) => existsSync(resolve(file)))) {
      try {
        // eslint-disable-next-line global-require
        qconfigClient = require('@qnpm/qconfig-client-plus');
      } catch (e) {
        missModuleMessage('@qnpm/qconfig-client-plus');
        throw e;
      }
      await qconfigClient.init(options);
    } else {
      console.error(`qconfig client can not found ${files.join(',')} at project root.`);
    }
  }
  // checkQconfigEnv();
};

export const client = qconfigClient;
