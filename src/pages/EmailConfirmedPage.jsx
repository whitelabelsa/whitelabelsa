import { useEffect, useState } from "react";
import { supabase } from "@/lib/customSupabaseClient";
import { useNavigate } from "react-router-dom";

const EmailConfirmedPage = () => {
  const [status, setStatus] = useState("loading"); // loading | success | error
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
        setStatus("success");

        // تحويل بعد 2 ثانية
        setTimeout(() => {
          navigate("/customer-dashboard");
        }, 2000);
      } else {
        setStatus("error");
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center font-cairo">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center w-[350px]">

        {status === "loading" && (
          <>
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-bold">جاري تأكيد الإيميل...</h2>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-500 text-5xl mb-3">✅</div>
            <h2 className="text-xl font-bold">تم تأكيد الإيميل بنجاح</h2>
            <p className="text-gray-500 mt-2">جاري تحويلك للداشبورد...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-500 text-5xl mb-3">❌</div>
            <h2 className="text-xl font-bold">فشل تأكيد الإيميل</h2>
            <p className="text-gray-500 mt-2">
              حاول تسجيل الدخول أو اطلب رابط جديد
            </p>

            <button
              onClick={() => navigate("/customer-login")}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              الذهاب لتسجيل الدخول
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default EmailConfirmedPage;