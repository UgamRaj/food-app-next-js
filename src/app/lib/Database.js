const { usernamedb, password, dbname } = process.env;

export const connectionStr = `mongodb+srv://${usernamedb}:${password}@cluster0.tisykvb.mongodb.net/${dbname}?retryWrites=true&w=majority&appName=Cluster0`;
