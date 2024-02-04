"use client"

import { Card } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  TypographyLarge,
  TypographyMuted,
  TypographySmall,
} from "@/components/ui/typography"
import { timeAgo } from "@/helpers/dateHelper"
import CommentModel from "@/types/commentModel"
import { TooltipTrigger } from "@radix-ui/react-tooltip"

export default function OrderViewDesignCommentPreview({
  comment,
}: {
  comment: CommentModel
}) {
  return (
    <Card className="shadow p-4">
      <div className="flex justify-between items-start">
        <TypographyLarge>{comment.createdBy}</TypographyLarge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TypographyMuted>{timeAgo(comment.createdOn)}</TypographyMuted>
            </TooltipTrigger>
            <TooltipContent>
              <TypographySmall className="font-normal">
                {new Date(`${comment.createdOn}z`).toLocaleString()}
              </TypographySmall>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <TypographySmall className="font-normal">
        {comment.comment}
      </TypographySmall>
    </Card>
  )
}
