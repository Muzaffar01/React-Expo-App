import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class CacheService {
  private prefix = 'tbms_cache_';

  async get<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(this.prefix + key);
      if (!item) return null;

      const cached: CacheItem<T> = JSON.parse(item);
      const now = Date.now();

      if (cached.ttl && now - cached.timestamp > cached.ttl) {
        await this.remove(key);
        return null;
      }

      return cached.data;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): Promise<void> {
    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        ttl,
      };
      await AsyncStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.error('Cache remove error:', error);
    }
  }

  async invalidate(pattern: string): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const patternKeys = keys.filter(key => key.startsWith(this.prefix + pattern));
      await AsyncStorage.multiRemove(patternKeys);
    } catch (error) {
      console.error('Cache invalidate error:', error);
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.prefix));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  async getOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = 5 * 60 * 1000
  ): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached) return cached;

    const data = await fetchFn();
    await this.set(key, data, ttl);
    return data;
  }
}

export const cacheService = new CacheService();
export default cacheService;
