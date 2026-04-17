import { getUserAnalytics } from '@/repositories/user.repository';

export async function getAnalytics() {
    return getUserAnalytics();
}