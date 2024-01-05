import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const session = await getServerSession(options);
    const user = session?.user;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // const userSubscription = await prismadb.userSubscription.findUnique({
    //   where: {
    //     userId,
    //   },
    // });

    // if (userSubscription && userSubscription.stripeCustomerId) {
    //   const stripeSession = await stripe.billingPortal.sessions.create({
    //     customer: userSubscription.stripeCustomerId,
    //     return_url: settingsUrl,
    //   });

    //   return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    // }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user?.email || "",
      line_items: [
        {
          price_data: {
            currency: "AUD",
            product_data: {
              name: "Pro",
              description: "Unlimited AI Generations",
            },
            unit_amount: 1000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        name: user?.name || "",
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
