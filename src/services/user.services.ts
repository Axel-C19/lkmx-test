import {
    createUser,
    getUsers,
    softDeleteUser,
    updateUser
} from '@/repositories/user.repository';
import { CreateUserInput, UpdateUserInput } from '@/types/users';

export async function listUsers(search?: string) {
    return getUsers(search);
}

export async function addUser(input: CreateUserInput) {
    return createUser(input);
}

export async function editUser(id: number, input: UpdateUserInput) {
    return updateUser(id, input);
}

export async function removeUser(id: number) {
    return softDeleteUser(id);
}