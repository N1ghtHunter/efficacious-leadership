// atoms/userAtom.ts
import { atom } from 'recoil';

interface IUser {
	id: number;
	username: string;
	email: string;
	phone?: string;
	work?: string;
	city?: string;
	nationality?: string;
	birthdate?: string;
}

export const userState = atom<IUser | null>({
	key: 'userState', // Unique ID
	default: null, // Default value (initially, no user is logged in)
});
