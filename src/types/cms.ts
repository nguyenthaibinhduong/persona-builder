export type PostStatus = 'draft' | 'published';
export type ServiceStatus = 'active' | 'inactive';
export type PaymentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'refunded';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: PostStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  deliveryDays: number;
  features: string[];
  status: ServiceStatus;
  paymentLink: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  serviceId: string;
  serviceTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  requirements?: string;
  orderReference?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  stripeSessionId?: string;
  createdAt: string;
}

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image: string;
          status: PostStatus;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']> & { updated_at?: string };
      };
      services: {
        Row: {
          id: string;
          title: string;
          description: string;
          price: number;
          currency: string;
          delivery_days: number;
          features: string[];
          status: ServiceStatus;
          payment_link: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['services']['Insert']>;
      };
      payments: {
        Row: {
          id: string;
          service_id: string;
          service_title: string;
          client_name: string;
          client_email: string;
          client_phone: string | null;
          requirements: string | null;
          order_reference: string | null;
          amount: number;
          currency: string;
          status: PaymentStatus;
          stripe_session_id: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at' | 'order_reference'>;
        Update: Partial<Database['public']['Tables']['payments']['Insert']>;
      };
    };
  };
}
