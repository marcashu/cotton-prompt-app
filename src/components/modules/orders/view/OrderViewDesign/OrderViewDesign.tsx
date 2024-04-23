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
import CheckerStatus from "@/enums/checkerStatus"
import { KeyedMutator } from "swr"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrderViewDesign({
  order,
  mutate,
}: {
  order: GetOrderModel
  mutate: KeyedMutator<GetOrderModel>
}) {
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
        <OrderViewDesignUpload order={order} mutate={mutate} />
      ) : (
        <div className="flex flex-col gap-2">
          <OrderViewDesignPreview url={currentDesign?.url} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" asChild>
              <Link
                href={`${process.env.NEXT_PUBLIC_API_URL}/api/Designs/${currentDesign?.id}/download`}
                target="_blank"
                prefetch={false}
              >
                Download
              </Link>
            </Button>
            {isChecker &&
              !!currentDesign &&
              order.checkerStatus === CheckerStatus.ForReview &&
              order.artistId && (
                <OrderViewDesignApproveButton id={order.id} mutate={mutate} />
              )}
          </div>
        </div>
      )}
      {!!currentDesign && (
        <>
          {currentDesign.comments.length > 0 && (
            <TypographyH4>Comments</TypographyH4>
          )}
          {currentDesign.comments.map((c, i) => (
            <OrderViewDesignCommentPreview key={i} comment={c} />
          ))}
          {isChecker && !!order.checkerStatus && !isApproved && (
            <OrderViewDesignComment
              id={currentDesign.id}
              orderId={order.id}
              checkerStatus={order.checkerStatus}
              mutate={mutate}
            />
          )}
        </>
      )}
    </Card>
  )
}
