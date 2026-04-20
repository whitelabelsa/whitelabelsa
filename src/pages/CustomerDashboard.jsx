import React from "react";
import { useAuth } from "@/contexts/SupabaseAuthContext";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-6 font-cairo">

      <h1 className="text-3xl mb-6">
        👋 أهلاً {user?.user_metadata?.company}
      </h1>

      {/* بيانات العميل */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <p>📧 {user?.email}</p>
        <p>📞 {user?.user_metadata?.phone}</p>
        <p>📍 {user?.user_metadata?.address}</p>
      </div>

      {/* أزرار */}
      <div className="flex gap-3 flex-wrap">

        <button onClick={() => navigate("/customer-profile")}>
          تعديل البيانات
        </button>

        <button onClick={() => navigate("/customer-orders")}>
          الطلبات
        </button>

        <button onClick={() => navigate("/customer-messages")}>
          الرسائل
        </button>

        <button
          onClick={async () => {
            await signOut();
            navigate("/customer-login");
          }}
        >
          تسجيل خروج
        </button>

      </div>

    </div>
  );
};

export default CustomerDashboard;
