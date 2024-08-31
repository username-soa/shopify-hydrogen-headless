const POLICY_FRAGMENT = `#graphql
    fragment Policy on ShopPolicy {
        body
        handle
        id
        title
        url
    }
`;

export default POLICY_FRAGMENT;
