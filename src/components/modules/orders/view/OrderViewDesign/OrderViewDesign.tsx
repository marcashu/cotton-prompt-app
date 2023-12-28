"use client"

import { Card } from "@/components/ui/card"
import { TypographyH3, TypographyMuted } from "@/components/ui/typography"
import OrderViewDesignUpload from "./OrderViewDesignUpload"
import GetOrderModel from "@/types/getOrderModel"
import useSession from "@/hooks/useSession"
import OrderViewDesignPreview from "./OrderViewDesignPreview"
import OrderViewDesignComment from "./OrderViewDesignComment"
import OrderViewDesignCommentPreview from "../OrderViewDesignCommentPreview"

export default function OrderViewDesign({ order }: { order: GetOrderModel }) {
  const { session } = useSession()

  if (!session) return <></>

  const isArtist = session.userRole === "artist"

  const currentDesign = order.design

  return (
    <Card className="py-6 container shadow flex flex-col gap-4">
      <TypographyH3>
        Design
        <TypographyMuted>
          {isArtist ? "Upload your design" : "View the current design"}
        </TypographyMuted>
      </TypographyH3>
      {isArtist ? (
        <OrderViewDesignUpload order={order} />
      ) : (
        <OrderViewDesignPreview url={currentDesign?.url} />
      )}
      {!!currentDesign &&
        currentDesign.comments.map((c, i) => (
          <OrderViewDesignCommentPreview key={i} comment={c} />
        ))}
      {!!currentDesign && <OrderViewDesignComment id={currentDesign.id} />}
    </Card>
  )
}
