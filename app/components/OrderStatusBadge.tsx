import { OrderStatus } from "../models/order";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  let bgColor = "";
  let textColor = "text-white";
  
  switch (status) {
    case "pending":
      bgColor = "bg-yellow-500";
      break;
    case "preparing":
      bgColor = "bg-blue-500";
      break;
    case "ready":
      bgColor = "bg-green-500";
      break;
    case "completed":
      bgColor = "bg-gray-500";
      break;
    case "cancelled":
      bgColor = "bg-red-500";
      break;
    default:
      bgColor = "bg-gray-400";
  }
  
  return (
    <span className={`${bgColor} ${textColor} px-2 py-1 rounded-full text-xs font-bold`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
