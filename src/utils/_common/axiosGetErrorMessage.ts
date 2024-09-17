import { AxiosError } from 'axios';
import { ErrorResponse } from '../../@types/_common/ErrorResponse';
import { TFunction } from 'i18next';

const getErrorMessage = (error: AxiosError, t: TFunction<string, string>) => {
	const errorMessage = (error.response?.data as ErrorResponse)?.message || t('common.errors.unknown');
	return errorMessage;
};

export default getErrorMessage;
