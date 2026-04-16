import { pool } from '@/lib/db';
import { CreateUserInput, User } from '@/types/users';

export async function getUsers(): Promise<User[]> {
    const result = await pool.query(
        'SELECT id, name, email, created_at FROM users ORDER BY id DESC'
    );

    return result.rows;
}

export async function createUser(input: CreateUserInput): Promise<User> {
    const result = await pool.query(
        `
      INSERT INTO users (name, email)
      VALUES ($1, $2)
      RETURNING id, name, email, created_at
    `,
        [input.name, input.email]
    );

    return result.rows[0];
}

export async function getUserAnalytics() {
    const totalUsersResult = await pool.query(
        'SELECT COUNT(*)::int AS total FROM users'
    );

    const usersTodayResult = await pool.query(`
    SELECT COUNT(*)::int AS total
    FROM users
    WHERE DATE(created_at) = CURRENT_DATE
  `);

    const latestUsersResult = await pool.query(
        `
      SELECT id, name, email, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 5
    `
    );

    return {
        totalUsers: totalUsersResult.rows[0].total,
        usersCreatedToday: usersTodayResult.rows[0].total,
        latestUsers: latestUsersResult.rows
    };
}