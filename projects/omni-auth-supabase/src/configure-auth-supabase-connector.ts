import {InjectionToken, Provider} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';

export type AuthSupabaseConfig = {
  url: string;
  publishableKey: string;
};

export const SUPABASE_CLIENT = new InjectionToken<SupabaseClient>('SUPABASE_CLIENT');

export const configureAuthSupabaseConnector = (params: AuthSupabaseConfig): Provider[] => {
  const supabaseClient = createClient(params.url, params.publishableKey);

  return [
    {
      provide: SUPABASE_CLIENT,
      useValue: supabaseClient,
    }
  ];
};
