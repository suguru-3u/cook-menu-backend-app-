/**
 * テーブル管理のインターフェースを書いています。
 */

import { dynamoIndexManageTable } from '../../model/cook-menu';

export interface SequencesRepository {
    detail: () => Promise<dynamoIndexManageTable>;

    /* eslint-disable no-unused-vars */
    update: (indexCount: number) => Promise<void>;
    /* eslint-enable no-unused-vars */
}
