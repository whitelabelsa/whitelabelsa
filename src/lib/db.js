// Initial implementation using LocalStorage as per system instructions
// This will be replaced by Supabase in production

export const db = {
  registrations: {
    create: async (data) => {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      const current = JSON.parse(localStorage.getItem('registrations') || '[]');
      const newEntry = { 
        id: Date.now().toString(), 
        ...data, 
        created_at: new Date().toISOString() 
      };
      localStorage.setItem('registrations', JSON.stringify([...current, newEntry]));
      return { data: newEntry, error: null };
    }
  },
  contact_messages: {
    create: async (data) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const current = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      const newEntry = { 
        id: Date.now().toString(), 
        ...data, 
        created_at: new Date().toISOString() 
      };
      localStorage.setItem('contact_messages', JSON.stringify([...current, newEntry]));
      return { data: newEntry, error: null };
    }
  }
};