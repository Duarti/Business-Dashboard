import Stripe from "stripe";
import { env } from "./env.server";

export function createStripeClient() {
  return new Stripe("", {
    apiVersion: "2023-10-16",
    httpClient: Stripe.createFetchHttpClient(),
  });
}
