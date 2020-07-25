const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const resolvers = {
	Query: {
		info: () => `This is API of Hacker news clone`,
		feed: async () => (parent, args, context) => {
			return context.prisma.link.findMany();
		},
	},

	Mutation: {
		post: (parent, args, context, info) => {
			const newLink = context.prisma.link.create({
				data: {
					url: args.url,
					description: args.description,
				},
			});
			return newLink;
		},
	},
};

const server = new GraphQLServer({
	typeDefs: "./server/schema.graphql",
	resolvers,
	context: {
		prisma,
	},
});

server.start(() => console.log(`Server is running on port 4000`));
