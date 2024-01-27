const filterTagList = (tags) => {
	return (tags || []).filter(
		(tag) => ["all", "notes", "likes"].indexOf(tag) === -1
	);
};

module.exports = filterTagList;
