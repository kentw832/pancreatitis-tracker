import { getApi, postApi, postApiWithoutToken } from './apiWrapper';
import {
	SAVE_PATIENT_DATA,
	CREATE_ACCOUNT_URL,
	LOAD_INPUT_HISOTRY,
	FEEDBACK_URL
} from './api_url';

export const loadInputHistoryApi = () => {
	return getApi(LOAD_INPUT_HISOTRY)
		.then((res) => {
			if (res.success) {
				return {
					success: true,
					data: res
				};
			}

			return {
				success: false,
				msg: res.msg
			};
		})
		.catch(err => {
			return {
				success: false,
				msg: 'error catch'
			};
		});
};

export const savePatientDataApi = (data) => {
	return postApi(SAVE_PATIENT_DATA, JSON.stringify(data))
		.then((res) => {
			if (res.success) {
				return {
					success: true,
					data: res.data
				};
			}

			return {
				success: false,
				msg: res.msg
			};
		})
		.catch(err => {
			return {
				success: false,
				msg: 'error catch'
			};
		});
};

export const leaveFeedbackApi = (feedback) => {
	const data = JSON.stringify({
		content: feedback
	});

	return postApi(FEEDBACK_URL, data)
		.then(response => {
			if (response == 'success') {
				return {
					success: true
				};
			}
		})
		.catch((err) => {
			return {
				success: false,
				msg: err
			};
		});
};

export const createAccountApi = (data) => {
	const params = JSON.stringify(data);

	return postApiWithoutToken(CREATE_ACCOUNT_URL, params)
		.then(response => {
			if (response) {
				switch (response.status) {
					case 'authenticated':
						return {
							success: true,
							token: response.jwt
						};

					case 'email-sent':
						return {
							success: false,
							msg: response.msg,
							error: false
						};

					default:
						return {
							success: false,
							msg: response.msg,
							error: true
						};
				}
			}
		})
		.catch((err) => {
			return {
				success: false,
				msg: 'Server is not available!',
				error: true
			};
		});
};