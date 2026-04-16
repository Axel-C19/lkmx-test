import { createUser, getUsers } from '@/repositories/user.repository';
import { CreateUserInput } from '@/types/users';

export async function listUsers() {
    return getUsers();
}

export async function addUser(input: CreateUserInput) {
    return createUser(input);
}