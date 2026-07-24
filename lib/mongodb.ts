// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Veuillez définir la variable MONGODB_URI dans .env.local");
// }

// declare global {    // On déclare une variable globale pour réutiliser la connexion.
//   var mongooseConnection: {
//     conn: typeof mongoose | null;
//     promise: Promise<typeof mongoose> | null;
//   };
// }

// const cached = global.mongooseConnection || { // On récupère la connexion existante si elle existe déjà.
//   conn: null,
//   promise: null,
// };

// global.mongooseConnection = cached;

// export async function connectDB() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI!);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }



import mongoose from "mongoose";

declare global {
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const cached = global.mongooseConnection || {
  conn: null,
  promise: null,
};

global.mongooseConnection = cached;

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Veuillez définir la variable MONGODB_URI.");
    throw new Error("Veuillez définir la variable MONGODB_URI");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}