exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;

	const typeDefs = [
		`type MarkdownRemark implements Node {
			frontmatter: Frontmatter
			}`,
		`type Frontmatter @infer {
				coverImg: File @fileByRelativePath,
			}`,
	];

	createTypes(typeDefs);
};
