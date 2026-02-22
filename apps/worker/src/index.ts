import { Queue, Worker } from 'bullmq';

const connection = { host: process.env.REDIS_HOST || 'redis', port: Number(process.env.REDIS_PORT || 6379) };
const queue = new Queue('cyx-jobs', { connection });

new Worker(
  'cyx-jobs',
  async (job) => {
    console.log('processing', job.name, job.data);
    return { ok: true };
  },
  { connection }
);

(async () => {
  await queue.add('monitoring-check', { exposureId: 'exp-1' });
})();
