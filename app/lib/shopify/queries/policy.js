import POLICY_FRAGMENT from '../fragments/policy';

export const POLICY_CONTENT_QUERY = `#graphql
    query Policy(
        $country: CountryCode
        $language: LanguageCode
        $privacyPolicy: Boolean!
        $refundPolicy: Boolean!
        $shippingPolicy: Boolean!
        $termsOfService: Boolean!
    ) @inContext(language: $language, country: $country) {
        shop {
            privacyPolicy @include(if: $privacyPolicy) {
                ...Policy
            }
            shippingPolicy @include(if: $shippingPolicy) {
                ...Policy
            }
            termsOfService @include(if: $termsOfService) {
                ...Policy
            }
            refundPolicy @include(if: $refundPolicy) {
                ...Policy
            }
        }
    }
    ${POLICY_FRAGMENT}
`;
