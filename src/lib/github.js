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
	const shorten = (data) => {
		return data.map((repo) => {
			const { name, description, stargazers_count, forks_count, html_url, language } = repo;
			return { name, description, stargazers_count, forks_count, html_url, language };
		});
	};
	return shorten(await getRequest(`https://api.github.com/user/repos?visibility=public&sort=pushed`, providedFetch));
}

export async function getGists(providedFetch) {
	const shorten = (data) => {
		return data.map((gist) => {
			const { description, created_at, comments, html_url } = gist;
			return { description, created_at, comments, html_url };
		});
	};
	return shorten(await getRequest(`https://api.github.com/gists`, providedFetch));
}
