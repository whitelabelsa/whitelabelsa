import { useEffect, useState } from "react";
import { supabase } from "@/lib/customSupabaseClient";
import { useAuth } from "@/contexts/SupabaseAuthContext";

const CustomerOrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setOrders(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="p-6 font-cairo">

      <h1 className="text-2xl mb-6">📦 طلباتي</h1>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : orders.length === 0 ? (
        <p>لا توجد طلبات حتى الآن</p>
      ) : (
        <div className="space-y-3">

          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow p-4 rounded">

              <h2 className="font-bold">{order.title}</h2>

               <p>
                    الحالة:{" "}
                        <span
                                className="px-2 py-1 rounded text-white text-sm"
                                style={{
                                  background:
                                    order.status === "done"
                                      ? "green"
                                      : order.status === "in_progress"
                                      ? "orange"
                                      : "blue",
                                }}
                              >
                                {order.status}
                    </span>
                  </p>

              
              <p className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default CustomerOrdersPage;
