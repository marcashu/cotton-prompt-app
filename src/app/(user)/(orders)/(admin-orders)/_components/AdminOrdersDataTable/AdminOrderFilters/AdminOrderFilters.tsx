import { useEffect, useReducer } from "react"
import OrderNumberFilter from "./OrderNumberFilter"
import GetOrdersModel from "@/types/getOrdersModel"
import OrderFiltersModel from "@/types/orderFiltersModel"
import AdminStatus from "@/enums/adminStatus"
import useSWR from "swr"
import PriorityFilter from "./PriorityFilter"
import ResetFiltersButton from "./ResetFiltersButton"

export default function AdminOrderFilters({
  adminStatus,
  onSearch,
}: {
  adminStatus: AdminStatus
  onSearch: (orderFilters: OrderFiltersModel) => void
}) {
  const { data } = useSWR<GetOrdersModel[]>(`/api/orders/${adminStatus}`)
  const [orderFilters, dispatch] = useReducer(orderFiltersReducer, {
    orderNumbers: [],
    priorities: [],
    artists: [],
  })

  const resetFilters = () => {
    dispatch({ type: "reset", payload: [] })
  }

  useEffect(() => {
    onSearch(orderFilters)
  }, [onSearch, orderFilters])

  return (
    <div className="flex gap-2">
      <OrderNumberFilter
        data={data}
        values={orderFilters.orderNumbers}
        onSelect={(values) =>
          dispatch({ type: "setOrderNumbers", payload: values })
        }
      />
      <PriorityFilter
        data={data}
        values={orderFilters.priorities}
        onSelect={(values) =>
          dispatch({ type: "setPriorities", payload: values })
        }
      />
      {(orderFilters.orderNumbers.length > 0 ||
        orderFilters.priorities.length > 0) && (
        <ResetFiltersButton onReset={resetFilters} />
      )}
    </div>
  )
}

const orderFiltersReducer = (
  state: OrderFiltersModel,
  action: { type: string; payload: string[] }
) => {
  if (action.type === "setOrderNumbers") {
    return {
      ...state,
      orderNumbers: action.payload,
    }
  }

  if (action.type === "setPriorities") {
    return {
      ...state,
      priorities: action.payload,
    }
  }

  if (action.type === "setArtists") {
    return {
      ...state,
      artists: action.payload,
    }
  }

  if (action.type === "reset") {
    return {
      orderNumbers: [],
      priorities: [],
      artists: [],
    }
  }

  return state
}
