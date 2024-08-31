import MENU_FRAGMENT from '../fragments/menu';
import SHOP_FRAGMENT from '../fragments/shop';

export const LAYOUT_QUERY = `#graphql
    query layout(
    $language: LanguageCode
    $headerMenuHandle: String!
    $footerMenuHandle: String!
    ) @inContext(language: $language) {
        shop {
            ...Shop
        }
        headerMenu: menu(handle: $headerMenuHandle) {
            ...Menu
        }
        footerMenu: menu(handle: $footerMenuHandle) {
            ...Menu
        }
    }
    ${SHOP_FRAGMENT}
    ${MENU_FRAGMENT}
`;
