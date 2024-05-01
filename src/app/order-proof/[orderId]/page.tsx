import { getOrderById } from "@/components/modules/orders/orderService"
import { TypographyH2, TypographyMuted } from "@/components/ui/typography"
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
      className="flex flex-col gap-4 bg-[#f0e9da] pb-4"
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
      <div className="grow flex flex-col">
        <div className="grow relative">
          <FullscreenableImage src={design.url} alt="design preview" />
        </div>
        <TypographyMuted className="italic text-center">
          Tip: Click on the image to toggle fullscreen
        </TypographyMuted>
      </div>
      {order.customerStatus === CustomerStatus.ForReview && (
        <OrderProofButtons orderId={orderId} designId={design.id} />
      )}
    </div>
  )
}
