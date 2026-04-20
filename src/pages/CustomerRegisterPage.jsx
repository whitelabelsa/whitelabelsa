import { useAuth } from "@/contexts/SupabaseAuthContext";

const CustomerRegisterPage = () => {
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await signUp(
      form.email,
      form.password,
      {
        data: {
          company: form.company,
          phone: form.phone,
          address: form.address,
        }
      }
    );

    if (!error) {
      alert("تم التسجيل ✅ تحقق من الإيميل 📩");
    }
  };
};
