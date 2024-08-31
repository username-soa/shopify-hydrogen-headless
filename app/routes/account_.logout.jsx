import {redirect} from '@shopify/remix-oxygen';

export async function loader() {
  return redirect('/');
}

export async function action({context}) {
  return context.customerAccount.logout();
}
