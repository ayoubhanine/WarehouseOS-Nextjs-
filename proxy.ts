// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/dashboard"],
// };
import { withAuth } from "next-auth/middleware";

export default withAuth;

export const config = {
  matcher: ["/dashboard"],
};