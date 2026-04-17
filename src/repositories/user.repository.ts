import { pool } from '@/lib/db';
import { CreateUserInput, User } from '@/types/users';

export async function getUsers(search?: string): Promise<User[]> {
    if (search) {
        const result = await pool.query(
            `
        SELECT id, name, email, status, created_at, updated_at
        FROM users
        WHERE status = 'active'
          AND (
            name ILIKE $1
            OR email ILIKE $1
          )
        ORDER BY id DESC
      `,
            [`%${search}%`]
        );

        return result.rows;
    }

    const result = await pool.query(
        `
      SELECT id, name, email, status, created_at, updated_at
      FROM users
      WHERE status = 'active'
      ORDER BY id DESC
    `
    );

    return result.rows;
}

export async function createUser(input: CreateUserInput): Promise<User> {
    const result = await pool.query(
        `
      INSERT INTO users (name, email)
      VALUES ($1, $2)
      RETURNING id, name, email, status, created_at, updated_at
    `,
        [input.name, input.email]
    );

    return result.rows[0];
}

export async function updateUser(
    id: number,
    input: CreateUserInput
): Promise<User | null> {
    const result = await pool.query(
        `
      UPDATE users
      SET name = $1,
          email = $2,
          updated_at = NOW()
      WHERE id = $3
        AND status = 'active'
      RETURNING id, name, email, status, created_at, updated_at
    `,
        [input.name, input.email, id]
    );

    return result.rows[0] ?? null;
}

export async function softDeleteUser(id: number): Promise<User | null> {
    const result = await pool.query(
        `
      UPDATE users
      SET status = 'deleted',
          updated_at = NOW()
      WHERE id = $1
        AND status = 'active'
      RETURNING id, name, email, status, created_at, updated_at
    `,
        [id]
    );

    return result.rows[0] ?? null;
}

export async function getUserAnalytics() {
    const totalUsersResult = await pool.query(
        'SELECT COUNT(*)::int AS total FROM users'
    );

    const activeUsersResult = await pool.query(
        "SELECT COUNT(*)::int AS total FROM users WHERE status = 'active'"
    );

    const deletedUsersResult = await pool.query(
        "SELECT COUNT(*)::int AS total FROM users WHERE status = 'deleted'"
    );

    const usersTodayResult = await pool.query(`
    SELECT COUNT(*)::int AS total
    FROM users
    WHERE DATE(created_at) = CURRENT_DATE
  `);

    const latestUsersResult = await pool.query(`
    SELECT id, name, email, status, created_at, updated_at
    FROM users
    ORDER BY created_at DESC
    LIMIT 5
  `);

    return {
        totalUsers: totalUsersResult.rows[0].total,
        activeUsers: activeUsersResult.rows[0].total,
        deletedUsers: deletedUsersResult.rows[0].total,
        usersCreatedToday: usersTodayResult.rows[0].total,
        latestUsers: latestUsersResult.rows
    };
}