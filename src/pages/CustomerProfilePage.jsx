import { useEffect, useState } from "react";
import { supabase } from "@/lib/customSupabaseClient";
import { useAuth } from "@/contexts/SupabaseAuthContext";

const CustomerProfilePage = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    company: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // تحميل البيانات الحالية
  useEffect(() => {
    if (user) {
      setForm({
        company: user.user_metadata?.company || "",
        phone: user.user_metadata?.phone || "",
        address: user.user_metadata?.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // حفظ التعديلات
  const updateProfile = async () => {
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      data: {
        company: form.company,
        phone: form.phone,
        address: form.address,
      },
    });

    setLoading(false);

    if (!error) {
      alert("تم تحديث البيانات ✅");
    } else {
      alert("حدث خطأ");
    }
  };

  return (
    <div className="p-6 font-cairo">

      <h1 className="text-2xl mb-6">👤 تعديل بيانات الشركة</h1>

      <div className="space-y-3">

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="اسم الشركة"
          className="border p-2 w-full"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="رقم الهاتف"
          className="border p-2 w-full"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="العنوان"
          className="border p-2 w-full"
        />

        <button onClick={updateProfile} disabled={loading}>
          {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
        </button>

      </div>

    </div>
  );
};

export default CustomerProfilePage;