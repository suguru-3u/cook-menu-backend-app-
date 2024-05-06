/**
 * 献立メニューのインターフェースを書いています。
 */

import { RequestCookMenu } from '../model/request-cookmenu';
import { UpdateRequestCookMenu } from '../model/update-request-cookmenu';
import { cookMenuList } from '../../model/cook-menu';

export interface CookMenuRepository {
    list: () => Promise<cookMenuList[]>;

    /* eslint-disable no-unused-vars */
    insert: (indexNum: number, requestCookMenu: RequestCookMenu) => Promise<void>;

    detail: (id: number) => Promise<cookMenuList>;

    update: (requestCookMenu: UpdateRequestCookMenu) => Promise<void>;

    delete: (id: number) => Promise<void>;
    /* eslint-enable no-unused-vars */
}
