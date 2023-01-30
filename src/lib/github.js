async function getRequest(url, providedFetch) {
	const auth_header = {
		Accept: 'application/vnd.github.v3+json',
		Authorization: `token ${import.meta.env.VITE_GH_TOKEN}`
	}; 
	const res = await providedFetch(url, {
		headers: auth_header
	});

	const result = await res.json();
	if ('message' in result && res.status > 400)
		throw new Error(res.status + ' ' + res.statusText + '\n' + (result && result.message));
	return result;
}

export async function getRepos(providedFetch) {
	return await getRequest(`https://api.github.com/user/repos?visibility=public&sort=pushed`, providedFetch);
}

export async function getGists(providedFetch) {
	return await getRequest(`https://api.github.com/gists`, providedFetch);
}
