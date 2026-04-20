import { useState } from "react";

const CustomerRegisterPage = () => {
  const [form, setForm] = useState({
    company: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("كلمة المرور غير متطابقة");
      return;
    }

    // 🔗 هنا تربطه مع Supabase
    console.log(form);

    alert("تم إنشاء الحساب، تحقق من الإيميل 📩");
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">إنشاء حساب عميل</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="company" placeholder="اسم الشركة" onChange={handleChange} className="input" />
        <input name="phone" placeholder="رقم الهاتف" onChange={handleChange} className="input" />
        <input name="address" placeholder="العنوان" onChange={handleChange} className="input" />
        <input name="email" placeholder="الإيميل" onChange={handleChange} className="input" />
        <input type="password" name="password" placeholder="كلمة المرور" onChange={handleChange} className="input" />
        <input type="password" name="confirmPassword" placeholder="تأكيد كلمة المرور" onChange={handleChange} className="input" />

        <button className="bg-blue-500 text-white p-2 w-full">
          تسجيل
        </button>
      </form>
    </div>
  );
};

export default CustomerRegisterPage;
