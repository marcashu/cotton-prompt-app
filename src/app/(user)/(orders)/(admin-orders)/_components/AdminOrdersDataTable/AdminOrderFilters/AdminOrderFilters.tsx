import { useEffect, useReducer } from "react"
import OrderNumberFilter from "./OrderNumberFilter"
import GetOrdersModel from "@/types/getOrdersModel"
import OrderFiltersModel from "@/types/orderFiltersModel"
import AdminStatus from "@/enums/adminStatus"
import useSWR from "swr"
import PriorityFilter from "./PriorityFilter"
import ResetFiltersButton from "./ResetFiltersButton"
import ArtistFilter from "./ArtistFilter"
import CheckerFilter from "./CheckerFilter"
import CustomerFilter from "./CustomerFilter"
import StatusFilter from "./StatusFilter"
import { TypographySmall } from "@/components/ui/typography"
import UserGroupFilter from "./UserGroupFilter"

export default function AdminOrderFilters({
  count,
  adminStatus,
  onSearch,
}: {
  count: number
  adminStatus: AdminStatus
  onSearch: (orderFilters: OrderFiltersModel) => void
}) {
  const { data } = useSWR<GetOrdersModel[]>(`/api/orders/${adminStatus}`)
  const [orderFilters, dispatch] = useReducer(orderFiltersReducer, {
    orderNumbers: [],
    priorities: [],
    artists: [],
    checkers: [],
    customers: [],
    status: [],
    userGroups: [],
  } as OrderFiltersModel)

  const resetFilters = () => {
    dispatch({ type: "reset", payload: [] })
  }

  useEffect(() => {
    onSearch(orderFilters)
  }, [onSearch, orderFilters])

  return (
    <div className="flex w-full justify-between gap-2 items-start">
      <div className="flex gap-2 flex-wrap">
        <OrderNumberFilter
          data={data ?? []}
          values={orderFilters.orderNumbers}
          onSelect={(values) =>
            dispatch({ type: "setOrderNumbers", payload: values })
          }
        />
        <PriorityFilter
          values={orderFilters.priorities}
          onSelect={(values) =>
            dispatch({ type: "setPriorities", payload: values })
          }
        />
        <StatusFilter
          values={orderFilters.status}
          onSelect={(values) =>
            dispatch({ type: "setStatus", payload: values })
          }
        />
        <UserGroupFilter
          data={data ?? []}
          values={orderFilters.userGroups}
          onSelect={(values) =>
            dispatch({ type: "setUserGroups", payload: values })
          }
        />
        <ArtistFilter
          data={data ?? []}
          values={orderFilters.artists}
          onSelect={(values) =>
            dispatch({ type: "setArtists", payload: values })
          }
        />
        <CheckerFilter
          data={data ?? []}
          values={orderFilters.checkers}
          onSelect={(values) =>
            dispatch({ type: "setCheckers", payload: values })
          }
        />
        <CustomerFilter
          data={data ?? []}
          values={orderFilters.customers}
          onSelect={(values) =>
            dispatch({ type: "setCustomers", payload: values })
          }
        />
        {Object.values(orderFilters).some((field) => field.length > 0) && (
          <ResetFiltersButton onReset={resetFilters} />
        )}
      </div>
      <TypographySmall className="w-[100px] text-right mt-[10px]">{`${count} Order(s)`}</TypographySmall>
    </div>
  )
}

const orderFiltersReducer = (
  state: OrderFiltersModel,
  action: { type: string; payload: string[] }
) => {
  let result: OrderFiltersModel

  if (action.type === "setOrderNumbers") {
    result = {
      ...state,
      orderNumbers: action.payload,
    }
  } else if (action.type === "setPriorities") {
    result = {
      ...state,
      priorities: action.payload,
    }
  } else if (action.type === "setArtists") {
    result = {
      ...state,
      artists: action.payload,
    }
  } else if (action.type === "setCheckers") {
    result = {
      ...state,
      checkers: action.payload,
    }
  } else if (action.type === "setCustomers") {
    result = {
      ...state,
      customers: action.payload,
    }
  } else if (action.type === "setStatus") {
    result = {
      ...state,
      status: action.payload,
    }
  } else if (action.type === "setUserGroups") {
    result = {
      ...state,
      userGroups: action.payload,
    }
  } else if (action.type === "reset") {
    result = {
      orderNumbers: [],
      priorities: [],
      artists: [],
      checkers: [],
      customers: [],
      status: [],
      userGroups: [],
    }
  } else {
    result = state
  }

  return result
}
