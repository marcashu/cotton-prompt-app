import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import Spinner from "./spinner"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        orderProofDefault:
          "bg-[#007a80] rounded-[25px] font-bold text-primary-foreground hover:bg-[#00494d]",
        orderProofOutline:
          "text-[#3A3A3A] rounded-[25px] font-bold border border-input bg-background hover:bg-accent",
        blueButton:
          "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      disabled,
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    const getChildren = () => {
      if (loading) {
        if (size === "icon") {
          return <Spinner />
        } else {
          return (
            <div className="flex gap-1 items-center">
              <Spinner />
              {children}
            </div>
          )
        }
      } else {
        return children
      }
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {getChildren()}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
