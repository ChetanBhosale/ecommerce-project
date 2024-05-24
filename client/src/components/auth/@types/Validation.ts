import z from "zod";

export interface AuthState {
  auth: {
    page: number;
  };
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ISignupData {
  email: string;
  password: string;
  user: string;
}

// zod validation

export const ILogin = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "password should be minimum 8 characters")
    .max(32, "password should be maximum 32 characters"),
});

export const ISignup = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "password should be minimum 8 characters")
    .max(32, "password should be maximum 32 characters"),
  user: z.string(),
});

// type

export type TLoginForm = z.infer<typeof ILogin>;
export type TRegisterForm = z.infer<typeof ISignup>;
