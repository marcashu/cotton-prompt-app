import { getOrderById } from "@/components/modules/orders/orderService"
import {
  TypographyH2,
  TypographyLarge,
  TypographyMuted,
} from "@/components/ui/typography"
import OrderProofButtons from "./_components/OrderProofButtons"
import CustomerStatus from "@/enums/customerStatus"
import Image from "next/image"
import FullscreenableImage from "@/components/ui/fullscreenable-image"

export const dynamic = "force-dynamic"

export default async function OrderProofPage({
  params,
}: {
  params: { orderId: number }
}) {
  const orderId = params.orderId
  const order = await getOrderById(orderId)
  const design = order.design

  if (!design) return <></>

  return (
    <div
      className="flex flex-col gap-4 bg-[#f0e9da] pb-5"
      style={{ height: "100dvh" }}
    >
      <div>
        <Image
          src="/logo/cottonprompt_logo.png"
          alt="Cotton Prompt Logo"
          width={192}
          height={108}
          className="mx-auto"
        />
        <TypographyH2 className="text-center text-[#3A3A3A]">
          Order {order.orderNumber}
        </TypographyH2>
      </div>
      <div className="grow flex flex-col min-h-0">
        <div className="grow relative min-h-[200px]">
          <FullscreenableImage
            src={
              order.customerStatus === CustomerStatus.ForReview
                ? design.url
                : "/order-proof-placeholder.png"
            }
            alt="design preview"
          />
        </div>
        {order.customerStatus === CustomerStatus.ForReview && (
          <TypographyMuted className="italic text-center">
            Tip: Click on the image to toggle fullscreen
          </TypographyMuted>
        )}
      </div>
      {order.customerStatus === CustomerStatus.ForReview ? (
        <OrderProofButtons orderId={orderId} designId={design.id} />
      ) : order.customerStatus === CustomerStatus.Accepted ? (
        <TypographyLarge className="text-center italic text-[#3a3a3a]">
          We are currently working on finalizing your order.
        </TypographyLarge>
      ) : (
        <TypographyLarge className="text-center italic text-[#3a3a3a]">
          We are currently updating the order design based on your request.
        </TypographyLarge>
      )}
    </div>
  )
}
