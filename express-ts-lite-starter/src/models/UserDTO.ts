import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserRequest {
    @IsNotEmpty({ message: 'Email harus diisi.' })
    @IsEmail({}, { message: 'Email bukan alamat email yang valid.' })
    email!: string; // <--- Add '!' here

    @IsNotEmpty({ message: 'Password harus diisi.' })
    @MinLength(6, { message: 'Password minimal 6 karakter.' })
    password!: string; // <--- Add '!' here
}

export class UserResponse {
    id!: string; // <--- Add '!' here
    email!: string; // <--- Add '!' here
    role!: string; // <--- Add '!' here
}