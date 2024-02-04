"use client"

import { Card } from "@/components/ui/card"
import {
  TypographyH3,
  TypographyH4,
  TypographyMuted,
} from "@/components/ui/typography"
import OrderViewDesignUpload from "./OrderViewDesignUpload"
import GetOrderModel from "@/types/getOrderModel"
import useSession from "@/hooks/useSession"
import OrderViewDesignPreview from "./OrderViewDesignPreview"
import OrderViewDesignComment from "./OrderViewDesignComment"
import OrderViewDesignCommentPreview from "../OrderViewDesignCommentPreview"
import OrderViewDesignApproveButton from "./OrderViewDesignApproveButton"
import { CheckerStatus } from "@/app/(user)/(orders)/_lib/constants"

export default function OrderViewDesign({ order }: { order: GetOrderModel }) {
  const { session } = useSession()

  if (!session) return <></>

  const isArtist = session.userId === order.artistId
  const isChecker = session.userId === order.checkerId
  const isApproved = order.checkerStatus === CheckerStatus.Approved
  const forUpload = isArtist && !isApproved

  const currentDesign = order.design

  return (
    <Card className="py-6 container shadow flex flex-col gap-4">
      <TypographyH3>
        Design
        <TypographyMuted>
          {forUpload ? "Upload your design" : "View the current design"}
        </TypographyMuted>
      </TypographyH3>
      {forUpload ? (
        <OrderViewDesignUpload order={order} />
      ) : (
        <OrderViewDesignPreview url={currentDesign?.url} />
      )}
      {isChecker && !!currentDesign && !isApproved && order.artistId && (
        <div className="self-end">
          <OrderViewDesignApproveButton id={order.id} />
        </div>
      )}
      {!!currentDesign && (
        <>
          {isChecker ||
            (currentDesign.comments.length > 0 && (
              <TypographyH4>Comments</TypographyH4>
            ))}
          {currentDesign.comments.map((c, i) => (
            <OrderViewDesignCommentPreview key={i} comment={c} />
          ))}
          {isChecker && !!order.checkerStatus && !isApproved && (
            <OrderViewDesignComment
              id={currentDesign.id}
              orderId={order.id}
              checkerStatus={order.checkerStatus}
            />
          )}
        </>
      )}
    </Card>
  )
}
