const excludeTag = (tags, tagToExclude) => {
	const filteredTags = tags.filter((tag) => tag !== tagToExclude);
	return filteredTags;
};

module.exports = excludeTag;
