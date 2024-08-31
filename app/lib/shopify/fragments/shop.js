const SHOP_FRAGMENT = `#graphql
    fragment Shop on Shop {
        id
        name
        description
        primaryDomain {
        url
        }
        brand {
        logo {
            image {
            url
            }
        }
        }
    }
`;

export default SHOP_FRAGMENT;
