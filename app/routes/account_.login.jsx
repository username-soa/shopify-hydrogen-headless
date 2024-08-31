export async function loader({request, context}) {
  return context.customerAccount.login();
}
