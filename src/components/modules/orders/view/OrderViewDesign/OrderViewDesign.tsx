"use client"

import { Card } from "@/components/ui/card"
import {
  TypographyH3,
  TypographyH4,
  TypographyMuted,
  TypographySmall,
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
import Role from "@/enums/role"
import ArtistStatus from "@/enums/artistStatus"
import { toast } from "@/components/ui/use-toast"

export default function OrderViewDesign({
  order,
  mutate,
}: {
  order: GetOrderModel
  mutate: KeyedMutator<GetOrderModel>
}) {
  const { session } = useSession()

  if (!session) return <></>

  const isAdmin =
    session.selectedRole === Role.Admin ||
    session.selectedRole === Role.SuperAdmin
  const isArtist =
    (session.userId ?? "").toLowerCase() ===
    (order.artistId ?? "").toLowerCase()
  const isChecker =
    (session.userId ?? "").toLowerCase() ===
    (order.checkerId ?? "").toLowerCase()
  const isApproved = order.checkerStatus === CheckerStatus.Approved
  const forUpload = isArtist && !isApproved

  const hasCheckerRemoved = !!order.checkerRemovedOn

  // Admin can approve if: design exists, artist has submitted, and not yet approved
  const canAdminApprove =
    isAdmin &&
    order.artistId &&
    order.artistStatus === ArtistStatus.DesignSubmitted &&
    !isApproved

  const currentDesign = order.design

  return (
    <Card className="py-6 container shadow flex flex-col gap-4">
      <TypographyH3>
        Design
        <TypographyMuted>
          {forUpload ? "Upload your design" : "View the current design"}
        </TypographyMuted>
      </TypographyH3>

      {/* Checker removed warning - only show if not yet approved */}
      {hasCheckerRemoved && !isApproved && (
        <div className="bg-red-50 border border-red-300 rounded-md p-4">
          <TypographySmall className="text-red-600 font-bold">
            Checker removed
          </TypographySmall>
          <TypographyMuted className="text-red-500 text-sm">
            The checker was removed from this order. An admin needs to approve
            this order.
          </TypographyMuted>
        </div>
      )}

      {/* Show approved by admin notice */}
      {hasCheckerRemoved && isApproved && (
        <div className="bg-green-50 border border-green-300 rounded-md p-4">
          <TypographySmall className="text-green-600 font-bold">
            Approved by admin
          </TypographySmall>
          <TypographyMuted className="text-green-600 text-sm">
            This order was approved by an admin after the checker was removed.
          </TypographyMuted>
        </div>
      )}

      {forUpload ? (
        <OrderViewDesignUpload order={order} mutate={mutate} />
      ) : (
        <div className="flex flex-col gap-2">
          <OrderViewDesignPreview url={currentDesign?.url} />
          {!!currentDesign && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link
                  href={`${process.env.NEXT_PUBLIC_API_URL}/api/Designs/${currentDesign.id}/download`}
                  target="_blank"
                  prefetch={false}
                >
                  Download
                </Link>
              </Button>
              {isChecker &&
                order.checkerStatus === CheckerStatus.ForReview &&
                order.artistId && (
                  <OrderViewDesignApproveButton id={order.id} mutate={mutate} />
                )}
              {/* Admin approve button */}
              {canAdminApprove && (
                <OrderViewDesignApproveButton
                  id={order.id}
                  mutate={mutate}
                  isAdminApproval
                  approvedBy={session.userId}
                />
              )}
            </div>
          )}
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
          {isChecker && !isAdmin && !!order.checkerStatus && !isApproved && (
            <OrderViewDesignComment
              id={currentDesign.id}
              orderId={order.id}
              checkerStatus={order.checkerStatus}
              mutate={mutate}
            />
          )}
          {isAdmin && (
            <OrderViewDesignComment
              id={currentDesign.id}
              orderId={order.id}
              checkerStatus={order.checkerStatus!}
              mutate={mutate}
              isAdmin
            />
          )}
        </>
      )}
    </Card>
  )
}
