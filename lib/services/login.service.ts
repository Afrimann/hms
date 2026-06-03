import { authRepository } from "../repositories/auth.repository";

export const loginService = {
    login: (email: string, password: string) => {
        return authRepository.login({ email, password });
    },
};