import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;
let runtimeConfig: { url: string; anonKey: string } | null = null;

export const configureSupabase = (config: { url: string; anonKey: string }) => {
  const url = config.url.trim();
  const anonKey = config.anonKey.trim();

  if (!url || !anonKey) {
    runtimeConfig = null;
    browserClient = null;
    return;
  }

  const hasConfigChanged =
    runtimeConfig?.url !== url ||
    runtimeConfig?.anonKey !== anonKey;

  runtimeConfig = { url, anonKey };

  if (hasConfigChanged) {
    browserClient = null;
  }
};

const getSupabaseConfig = () => {
  if (runtimeConfig) {
    return runtimeConfig;
  }

  const url =
    import.meta.env.PUBLIC_SUPABASE_URL?.trim() ??
    import.meta.env.VITE_SUPABASE_URL?.trim();
  const anonKey =
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY?.trim() ??
    import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

  if (!url || !anonKey) {
    return {
      error:
        'Gallery configuration is missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to continue.',
    };
  }

  return { url, anonKey };
};

export const getSupabaseBrowserClient = () => {
  if (browserClient) {
    return { client: browserClient };
  }

  const config = getSupabaseConfig();

  if ('error' in config) {
    return config;
  }

  browserClient = createClient(config.url, config.anonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return { client: browserClient };
};
