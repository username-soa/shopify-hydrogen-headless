import {Suspense} from 'react';
import {Await} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Spinner} from '~/components/ui/Spinner';
import {useRootLoaderData} from '~/lib/root-data';
import Container from '~/components/ui/Container';
import {CartPageComponent} from '~/components/cart/Cart';
import {CartForm, getSeoMeta, Analytics} from '@shopify/hydrogen';

export async function loader({request}) {
  const seo = {
    description: 'Check out your curated selections in the Super Coffee cart.',
    title: 'Cart',
    titleTemplate: '%s | Super Coffee',
    url: request.url,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Cart',
    },
  };
  return json({seo});
}

export async function action({request, context}) {
  const {cart} = context;

  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = formDiscountCode ? [formDiscountCode] : [];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result.cart.id;
  const headers = cart.setCartId(result.cart.id);
  const {cart: cartResult, errors} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  headers.append('Set-Cookie', await context.session.commit());

  return json(
    {
      cart: cartResult,
      errors,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}

export const meta = ({matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};

export default function Cart() {
  const rootData = useRootLoaderData();
  const cartPromise = rootData.cart;

  return (
    <>
      <Container className="sm:py-6 py-4 grid md:gap-8 gap-4">
        <h1 className="font-bold uppercase lg:text-5xl md:text-[calc(-4rem+12.5vw)] text-3xl md:leading-tight lg:leading-tight">
          Cart
        </h1>
        <Suspense fallback={<Spinner />}>
          <Await
            resolve={cartPromise}
            errorElement={<div>An error occurred</div>}
          >
            {(cart) => {
              return <CartPageComponent cart={cart} />;
            }}
          </Await>
        </Suspense>
      </Container>
      <Analytics.CartView />
    </>
  );
}
