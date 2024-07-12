export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      purchase_history: {
        Row: {
          createdAt: string;
          id: string;
          pokemonId: string | null;
          pokemonNumber: number | null;
          userId: string | null;
        };
        Insert: {
          createdAt?: string;
          id?: string;
          pokemonId?: string | null;
          pokemonNumber?: number | null;
          userId?: string | null;
        };
        Update: {
          createdAt?: string;
          id?: string;
          pokemonId?: string | null;
          pokemonNumber?: number | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'purchase_history_pokemonId_fkey';
            columns: ['pokemonId'];
            isOneToOne: false;
            referencedRelation: 'user_pokemons';
            referencedColumns: ['pokemonId'];
          },
          {
            foreignKeyName: 'purchase_history_userId_fkey';
            columns: ['userId'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      user_pokemons: {
        Row: {
          createdAt: string;
          id: string;
          pokemonId: string | null;
          pokemonNumber: number | null;
          status: Json | null;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          id?: string;
          pokemonId?: string | null;
          pokemonNumber?: number | null;
          status?: Json | null;
          userId?: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          pokemonId?: string | null;
          pokemonNumber?: number | null;
          status?: Json | null;
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
          id: string;
          nickname: string | null;
        };
        Insert: {
          coins?: number | null;
          createdAt?: string;
          email: string;
          gameScore_ball?: number | null;
          gameScore_fruit?: number | null;
          gameScore_quiz?: number | null;
          id?: string;
          nickname?: string | null;
        };
        Update: {
          coins?: number | null;
          createdAt?: string;
          email?: string;
          gameScore_ball?: number | null;
          gameScore_fruit?: number | null;
          gameScore_quiz?: number | null;
          id?: string;
          nickname?: string | null;
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
