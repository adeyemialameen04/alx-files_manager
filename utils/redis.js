import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
    });

    this.client.connect()
      .catch((err) => console.error('Redis client connection failed:', err));
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error('Error getting key from Redis:', err);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, { EX: duration });
    } catch (err) {
      console.error('Error setting key in Redis:', err);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error('Error deleting key from Redis:', err);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;