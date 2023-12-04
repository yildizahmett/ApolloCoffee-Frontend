export const saveState = (key, value) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem(key, JSON.stringify(value));
	}
};

export const loadState = (key) => {
	if (typeof window !== 'undefined') {
		const storedValue = localStorage.getItem(key);

		if (storedValue === 'undefined') {
			localStorage.removeItem(key);
			return null;
		}

		return storedValue ? JSON.parse(storedValue) : null;
	}
	return null;
};

export const handleLogoutAdmin = (router) => {
	localStorage.removeItem('admin_token');
	router.replace('/admin-login');
};

export const handleLogoutCustomer = (router) => {
	localStorage.removeItem('customer_token');
	router.replace('/customer-login');
};
