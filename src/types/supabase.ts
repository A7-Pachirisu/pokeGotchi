export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          content: string | null;
          created_at: string;
          id: number;
          img_url: string | null;
          user_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: number;
          img_url?: string | null;
          user_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: number;
          img_url?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_user';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      user_pokemons: {
        Row: {
          createdAt: string;
          gifUrl: string | null;
          id: string;
          pokemonName: string | null;
          pokemonNumber: number | null;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          gifUrl?: string | null;
          id?: string;
          pokemonName?: string | null;
          pokemonNumber?: number | null;
          userId?: string;
        };
        Update: {
          createdAt?: string;
          gifUrl?: string | null;
          id?: string;
          pokemonName?: string | null;
          pokemonNumber?: number | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_pokemons_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          coins: number | null;
          createdAt: string;
          email: string;
          gameScore_ball: number | null;
          gameScore_fruit: number | null;
          gameScore_quiz: number | null;
          hashtags: string[] | null;
          id: string;
          nickname: string | null;
          profile_image: string | null;
        };
        Insert: {
          coins?: number | null;
          createdAt?: string;
          email: string;
          gameScore_ball?: number | null;
          gameScore_fruit?: number | null;
          gameScore_quiz?: number | null;
          hashtags?: string[] | null;
          id?: string;
          nickname?: string | null;
          profile_image?: string | null;
        };
        Update: {
          coins?: number | null;
          createdAt?: string;
          email?: string;
          gameScore_ball?: number | null;
          gameScore_fruit?: number | null;
          gameScore_quiz?: number | null;
          hashtags?: string[] | null;
          id?: string;
          nickname?: string | null;
          profile_image?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
