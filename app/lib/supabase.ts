export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      cart_items: {
        Row: {
          created_at: string
          id: number
          product_id: number | null
          quantity: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          product_id?: number | null
          quantity?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number | null
          quantity?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string
          id: number
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          category_description: string | null
          category_name: string | null
          created_at: string
          id: number
          image: string | null
        }
        Insert: {
          category_description?: string | null
          category_name?: string | null
          created_at?: string
          id?: number
          image?: string | null
        }
        Update: {
          category_description?: string | null
          category_name?: string | null
          created_at?: string
          id?: number
          image?: string | null
        }
        Relationships: []
      }
      delivery_informations: {
        Row: {
          barangay: string | null
          city: string | null
          created_at: string
          email: string | null
          firstname: string | null
          id: number
          lastname: string | null
          middlename: string | null
          phone: string | null
          street: string | null
          user_id: string | null
        }
        Insert: {
          barangay?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          firstname?: string | null
          id?: number
          lastname?: string | null
          middlename?: string | null
          phone?: string | null
          street?: string | null
          user_id?: string | null
        }
        Update: {
          barangay?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          firstname?: string | null
          id?: number
          lastname?: string | null
          middlename?: string | null
          phone?: string | null
          street?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      gcash_payments: {
        Row: {
          amount: number | null
          created_at: string
          id: number
          note: string | null
          order_id: number | null
          status: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          id?: number
          note?: string | null
          order_id?: number | null
          status?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          id?: number
          note?: string | null
          order_id?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gcash_payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: number
          order_id: number | null
          product_id: number | null
          product_image: string | null
          product_name: string | null
          product_price: number | null
          quantity: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          order_id?: number | null
          product_id?: number | null
          product_image?: string | null
          product_name?: string | null
          product_price?: number | null
          quantity?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          order_id?: number | null
          product_id?: number | null
          product_image?: string | null
          product_name?: string | null
          product_price?: number | null
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          account_id: string | null
          created_at: string
          delivery_information_id: number | null
          id: number
          is_cancelled: boolean | null
          order_number: string | null
          ordered_at: string | null
          payment_method: string | null
          status: string | null
          total: number | null
          user_id: number | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string
          delivery_information_id?: number | null
          id?: number
          is_cancelled?: boolean | null
          order_number?: string | null
          ordered_at?: string | null
          payment_method?: string | null
          status?: string | null
          total?: number | null
          user_id?: number | null
        }
        Update: {
          account_id?: string | null
          created_at?: string
          delivery_information_id?: number | null
          id?: number
          is_cancelled?: boolean | null
          order_number?: string | null
          ordered_at?: string | null
          payment_method?: string | null
          status?: string | null
          total?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_delivery_information_id_fkey"
            columns: ["delivery_information_id"]
            isOneToOne: false
            referencedRelation: "delivery_informations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_informations"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          created_at: string
          id: number
          product_id: number | null
          uri: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          product_id?: number | null
          uri?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number | null
          uri?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: number
          product_id: number | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: number
          product_id?: number | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: number
          product_id?: number | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: number | null
          created_at: string
          id: number
          image: string | null
          is_available: boolean | null
          price: number | null
          product_description: string | null
          product_name: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          id?: number
          image?: string | null
          is_available?: boolean | null
          price?: number | null
          product_description?: string | null
          product_name?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          id?: number
          image?: string | null
          is_available?: boolean | null
          price?: number | null
          product_description?: string | null
          product_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_informations: {
        Row: {
          account_id: string
          created_at: string
          firstname: string | null
          id: number
          lastname: string | null
          photo: string | null
          role: string | null
        }
        Insert: {
          account_id: string
          created_at?: string
          firstname?: string | null
          id?: number
          lastname?: string | null
          photo?: string | null
          role?: string | null
        }
        Update: {
          account_id?: string
          created_at?: string
          firstname?: string | null
          id?: number
          lastname?: string | null
          photo?: string | null
          role?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
